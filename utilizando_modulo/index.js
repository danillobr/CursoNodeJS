const fs = require('fs') // importando o modulo file system

fs.readFile('arquivo_de_texto.txt', 'utf8', (err, data) => {

    if(err){
        console.log(err)
    }

    console.log(data)
})