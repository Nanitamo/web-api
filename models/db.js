const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('webapi', 'root', 'N@ny2020', {
    host: 'localhost',
    dialect: 'mysql'
  });


// sequelize.authenticate().then(()=>{
//     console.log('Conexao realizado com sucesso!')
// }).catch(()=>{
//     console.log('Conexao não realizado com sucessso!')
// })
  module.exports = sequelize