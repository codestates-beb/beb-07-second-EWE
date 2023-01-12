// require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'ewe',
    host: 'ls-e945f0c999c4259a860dc114836dde7f7202e401.cvm0kfoaj1h1.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    timezone: '+09:00',
  },
  remote_test: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'ewetest',
    host: 'ls-e945f0c999c4259a860dc114836dde7f7202e401.cvm0kfoaj1h1.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    timezone: '+09:00',
  },
  production_test: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'ewe',
    host: 'ls-e945f0c999c4259a860dc114836dde7f7202e401.cvm0kfoaj1h1.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    timezone: '+09:00',
  },
};
