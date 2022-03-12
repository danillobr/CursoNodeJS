const inquirer = require('inquirer')
const chalk = require('chalk');

inquirer.prompt([{
        name: 'p1',
        message: 'Digite seu nome?',
    },
    {
        name: 'p2',
        message: "Digite sua idade?",
    }
]).then((answers) => {
    const nome = answers.p1
    const idade = answers.p2

    if (!nome || !idade) {
        throw new Error('É necessário que você digite ambas informações')
    }

    console.log(chalk.bgYellow.black(`Seu nome é ${nome} e você tem ${idade} anos!`))
}).catch(err => console.log(err))