const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()


//const db = require('./models/db')


const { eAdmin } = require('./middlewares/auth')
const User = require('./models/Usuario')




app.use(express.json())
app.use((req, res, next) => {

    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Acess-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
    res.header('Acess-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization')
    app.use(cors())
    next()
})



app.get('/usuarios', eAdmin, async(req, res) => {

    await User.findAll({order:[['id', 'DESC']]}).then((usuarios)=>{
        return res.json({
            erro: false,
            usuarios
        })

    }).catch(()=>{
        return res.json({
            erro: true,
            message: 'Nenhum usuario encontrado!!'
        })
    })

    
})
app.get('/usuario/:id', eAdmin, async(req, res)=>{
    await User.findByPk(req.params.id).then(usuario =>{
        return res.json({
            error: false,
            usuario
        })
    }).catch(()=>{
        return res.json({
            erro: true,
            message: 'Error: Usuario não encontrado'
        })
    })
})

app.put('/usuario',eAdmin, async(req, res)=>{
    var dados = req.body 

    dados.senha = await bcrypt.hash(dados.senha, 8)
    await User.update(dados, {where:{id: dados.id}}).then(()=>{
        return res.json({
            erro: false,
            message: 'Usuario Actualizado com sucesso!!'
        })
    }).catch(()=>{
        return res.json({
            erro: true,
            message: 'Error: Usuario não actualizado!!'
        })
    })
    
})

app.delete('/usuario/:id', eAdmin, async (req, res)=>{

    await User.destroy({where:{id: req.params.id}}).then(()=>{
        return res.json({
            error: false,
            message: 'Usuario elimininado com sucesso'
        })
    }).catch(()=>{
        return res.json({
            error: true,
            message: 'Error: Usuario não elimininado com sucesso'
        })
    })

})
app.post('/usuario', async (req, res) => {
    //const {nome, email, senha} = user 
    var dados = req.body

    dados.senha = await bcrypt.hash(dados.senha, 8)

    await User.create(dados).then(() => {
        return res.json({
            erro: false,
            message: 'Cadastrado com sucesso'
        })

    }).catch(() => {

        return res.json({
            erro: true,
            message: 'Error: Usuario não cadastrado com sucesso'
        })
    })


})


app.post('/login', async (req, res) => {
    //console.log(req.body.email)

    const usuario = await User.findOne({ where: { email: req.body.email}})
    if (usuario === null) {
        return res.json({
            error: true,
            message: 'Error: Usuario ou senha incorreta!!'
        })
    }
    if (!(await bcrypt.compare(req.body.senha, usuario.senha))) {
        return res.json({
            error: true,
            message: 'Error: Usuario ou senha incorreta!!'
        })
    }
    var token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
        //expiresIn: 600 //10Min
        expiresIn: '7d'  // 7 Dias
    })
    return res.json({
        error: false,
        message: 'Login Realizado com sucesso',
        token
        
    })
    
})


app.listen(8000, function () {
    console.log('Servidor conectado na porta 8000: http://localhost:8000')
})

