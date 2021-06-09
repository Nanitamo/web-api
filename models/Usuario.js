const db = require('./db')
const Sequelize = require('sequelize')


const User = db.define('usuarios', {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },

    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    
    senha:{
        type: Sequelize.STRING,
        allowNull: false

    }
})

User.sync();

module.exports = User



