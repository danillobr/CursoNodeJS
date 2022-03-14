// modulos internos
const chalk = require('chalk')
const inquerer = require('inquirer')

// modulos externos
const fs = require('fs')
const Choices = require('inquirer/lib/objects/choices')
const { inflateRaw } = require('zlib')
const { get } = require('http')
const { on } = require('events')

operation()

// operacions
function operation() {
    inquerer.prompt([{
        type: 'list',
        name: "action",
        message: "O que deseja fazer?",
        choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
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
    inquerer.prompt([{
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
    inquerer.prompt([{
        name: "accountName",
        message: "Qual o nome da sua conta?"
    }]).then((answer) => {

        const accountName = answer['accountName']

        // verify if account exist
        if (!checkAccount(accountName)) {
            return deposit()
        }

        inquerer.prompt([{
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
    inquerer.prompt([{
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
    inquerer.prompt([{
        name: "accountName",
        message: "Qual o nome da sua conta?"
    }]).then((ansewer) => {

        const accountName = ansewer['accountName']

        if (!checkAccount(accountName)) {
            return withdraw()
        }

        inquerer.prompt([{
            name: "amount",
            message: "Qual valor você deseja sacar?"
        }]).then((ansewer) => {

            const amount = ansewer['amount']

            console.log(amount)

        }).catch((err) => console.log(err))

    }).catch((err) => console.log(err))
}