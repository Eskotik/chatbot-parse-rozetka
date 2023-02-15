const dotenv = require('dotenv').config();
const {Sequelize} = require ('sequelize')
module.exports = new Sequelize(
    'ChatbotRozetka',
    'postgres',
    process.env.pass,
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
)