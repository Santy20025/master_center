const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = require('./config');


const mysql = require('mysql2');



const connection = mysql.createConnection({
  host: DB_HOST,  
  port: DB_PORT,         
  user: DB_USER,       
  password: DB_PASSWORD,        
  database: DB_NAME,
  connectTimeout: 1000000
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:');
    console.error('Código de error:', err.code);
    console.error('Número de error:', err.errno);
    console.error('Mensaje:', err.message);
    return;
  }
  console.log('Conexión a la base de datos');
});


module.exports = connection;
