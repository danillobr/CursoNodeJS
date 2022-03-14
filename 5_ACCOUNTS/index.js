// modulos internos
const chalk = require('chalk')
const inquirer = require('inquirer')

// modulos externos
const fs = require('fs')
const Choices = require('inquirer/lib/objects/choices')
const { inflateRaw } = require('zlib')
const { get } = require('http')
const { on } = require('events')

operation()

// operacions
function operation() {
    inquirer.prompt([{
        type: 'list',
        name: "action",
        message: "O que deseja fazer?",
        choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Transferir',
            'Sair'
        ]
    }]).then((answer) => {
        const action = answer['action']

        if (action === 'Criar Conta') {
            createAccount()
        } else if (action === 'Consultar Saldo') {
            getAccountBalance()
        } else if (action === 'Depositar') {
            deposit()
        } else if (action === 'Sacar') {
            withdraw()
        } else if (action === 'Transferir') {
            transferSender()
        } else {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'));
            process.exit()
        }
    }).catch((err) => {
        console.log(err)
    })
}

// create as account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
}

function buildAccount() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para a sua conta:'
    }]).then((answer) => {
        const accountName = answer['accountName']

        console.info(accountName)

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'))
            buildAccount()
            return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance": 0}',
            function(err) {
                console.log(err)
            },
        )

        console.log(chalk.green('Parabéns, a sua conta foi criada!'))
        operation()
    }).catch((err) => {
        console.log(err)
    })
}

// add an amount to user account
function deposit() {
    inquirer.prompt([{
        name: "accountName",
        message: "Qual o nome da sua conta?"
    }]).then((answer) => {

        const accountName = answer['accountName']

        // verify if account exist
        if (!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([{
            name: "amount",
            message: "Quanto você deseja depositar?"
        }]).then((answer) => {

            const amount = answer['amount']

            // add an amount
            addAmount(accountName, amount)
            operation()

        }).catch((err) => console.log(err))


    }).catch((err) => {
        console.log(err)
    })
}

// verify if account exists
function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    } else {
        return true
    }
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err)
        },
    )
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        fag: 'r',
    })

    return JSON.parse(accountJSON)
}

function getAccountBalance() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer['accountName']

        // verify account exists
        if (!checkAccount(accountName)) {
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Olá, o saldo da sua conta é R$${accountData.balance}`))
        operation()
    }).catch((err) => console.log(err))
}

// withdraw an amount from user account
function withdraw() {
    inquirer.prompt([{
        name: "accountName",
        message: "Qual o nome da sua conta?"
    }]).then((ansewer) => {

        const accountName = ansewer['accountName']

        if (!checkAccount(accountName)) {
            return withdraw()
        }

        inquirer.prompt([{
            name: "amount",
            message: "Qual valor você deseja sacar?"
        }]).then((ansewer) => {

            const amount = ansewer['amount']

            console.log(amount)
            removeAmount(accountName, amount)
        }).catch((err) => console.log(err))

    }).catch((err) => console.log(err))
}

function removeAmount(accountName, amount) {

    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return withdraw()
    }

    if (amount > accountData.balance) {
        console.log(chalk.bgRed.black('Valor indisponível!'));
        return withdraw()
    }

    accountData.balance -= parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err);
        },
    )

    console.log(chalk.green(`Foi realizado o saque de R$${amount} da sua conta!`))
    operation()
}

function transferSender() {
    inquirer.prompt([{
        name: 'accountSender',
        message: 'Qual o nome da sua conta?',
    }]).then((answers) => {

        const accountSender = answers.accountSender

        if (!checkAccount(accountSender)) {
            return transferSender()
        }

        transferRecipient(accountSender)

    }).catch((err) => console.log(err))
}

function transferRecipient(accountSender) {
    inquirer.prompt([{
        name: 'accountRecipient',
        message: "Qual o nome da conta que deseja fazer a transferência?",
    }]).then((answers) => {

        const accountRecipient = answers.accountRecipient

        if (!checkAccount(accountRecipient)) {
            return transferRecipient()
        }

        inquirer.prompt([{
            name: "amount",
            message: "Qual valor você deseja transferir?"
        }]).then((ansewer) => {

            const amount = ansewer['amount']

            console.log(amount)
            transferAmount(accountSender, accountRecipient, amount)
        }).catch((err) => console.log(err))

    }).catch((err) => console.log(err))
}

function transferAmount(accountSender, accountRecipient, amount) {

    const accountSenderData = getAccount(accountSender)
    const accountRecipientData = getAccount(accountRecipient)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return transferSender()
    }

    if (amount > accountSenderData.balance) {
        console.log(chalk.bgRed.black('Valor indisponível!'));
        return transferAmount()
    }

    accountSenderData.balance -= parseFloat(amount)
    accountRecipientData.balance += parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountSender}.json`,
        JSON.stringify(accountSenderData),
        function(err) {
            console.log(err);
        },
    )

    fs.writeFileSync(
        `accounts/${accountRecipient}.json`,
        JSON.stringify(accountRecipientData),
        function(err) {
            console.log(err);
        },
    )

    console.log(chalk.green(`Foi realizado a transferência no valor de R$${amount} da conta ${accountSender} para ${accountRecipient}!`))
    operation()
}