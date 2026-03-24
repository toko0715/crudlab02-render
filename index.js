const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());

/* 🔹 ROOT */
app.get('/', (req, res) => {
    res.send('API funcionando 🚀');
});

/* 🔹 CREATE */
app.post('/usuarios', async (req, res) => {
    const { nombre, email } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *',
            [nombre, email]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
{
  "nombre": "nombre",
  "email": "email@gmail.com"
}
*/

/* 🔹 READ ALL */
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



/* 🔹 READ ONE */
app.get('/usuarios/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE id = $1',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* 🔹 UPDATE */
app.put('/usuarios/:id', async (req, res) => {
    const { nombre, email } = req.body;

    try {
        const result = await pool.query(
            'UPDATE usuarios SET nombre=$1, email=$2 WHERE id=$3 RETURNING *',
            [nombre, email, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
{
  "nombre": "nombre",
  "email": "email@gmail.com"
}
*/

/* 🔹 DELETE */
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM usuarios WHERE id=$1 RETURNING *',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* 🔹 PUERTO (IMPORTANTE PARA RENDER) */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});