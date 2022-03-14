// modulos internos
const chalk = require('chalk')
const inquerer = require('inquirer')

// modulos externos
const fs = require('fs')
const Choices = require('inquirer/lib/objects/choices')

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
        }
    }).catch((err) => {
        console.log(err)
    })
}

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
}