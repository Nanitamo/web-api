const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {eAdmin} = require('./middlewares/auth')




app.use(express.json())
app.use((req, res, next) => {

    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Acess-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
    res.header('Acess-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization')
    app.use(cors())
    next()
})



app.get('/usuarios', eAdmin, (req, res) => {
    res.json({
        erro: false,
        message: 'Listar Usuários'
    })
})


app.post('/login', (req, res) => {
    //console.log(req.body.email)
    if ((req.body.email === 'nanitamo19@gmail.com') && (req.body.senha === '123456')) {

        const { id } = 1
        var privateKey = process.env.SECRET
        var token = jwt.sign({ id }, privateKey, {
            //expiresIn: 600 //10Min
            expiresIn: '7d'  // 7 Dias
        })

        return res.json({
            error: false,
            message: 'Login Valido!',
            token: token,
            //dados: req.body
        })
    }
    return res.json({
        error: true,
        message: 'Login ou senha incorreto!!'
    })
})


app.listen(8000, function () {
    console.log('Servidor conectado na porta 8000: http://localhost:8000')
})

