const jwt = require('jsonwebtoken')
const {promisify} = require('util')
require('dotenv').config()

module.exports = {
    eAdmin: async function validarToken(req, res, next) {

        const authHeader = req.headers.authorization
        const [, token] = authHeader.split(' ')
    
        if (!token) {
            return await res.json({
                error: true,
                message: 'Erro: Necessita fazer o login'
            })
        }
    
        try {
            const decode = await promisify(jwt.verify)(token, process.env.SECRET)
            req.userId = decode.id
            return next()
        } catch (error) {
    
            return await res.json({
                error: true,
                message: 'Erro: Email ou Senha Invalida'
            })
    
        }
    
        return next()
    
    }



}