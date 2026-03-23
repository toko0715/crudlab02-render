const mysql = require('mysql2');

// conexión
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'arlocampos', // tu contraseña
    database: 'lab02_solnube'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

module.exports = connection;