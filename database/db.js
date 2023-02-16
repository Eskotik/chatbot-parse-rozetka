const dotenv = require('dotenv').config();
const {Sequelize} = require ('sequelize')
port = process.env.port
password = process.env.pass
module.exports = new Sequelize(
    'ChatbotRozetka',
    'postgres',
    password,
    {
        host: 'localhost',
        port: port,
        dialect: 'postgres'
    }
)