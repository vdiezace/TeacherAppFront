const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '01-Set-95',
  database: 'appteacher-tablas',
  secret_key: 'AppTeacher'
});

connection.connect((error) => {
    if (error) {
      console.error('Error al conectar a la base de datos: ', error);
    } else {
      console.log('Conexión a la base de datos establecida correctamente');
    }
  });


const port = 3306; 
app.listen(port, () => {
  console.log(`Servidor backend iniciado en el puerto ${port}`);
});
