const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

app.post('/usuarios', async (req, res) => {
    const { nombre, email } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *',
            [nombre, email]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const { nombre, email } = req.body;

    await pool.query(
        'UPDATE usuarios SET nombre=$1, email=$2 WHERE id=$3',
        [nombre, email, req.params.id]
    );

    res.json({ mensaje: 'Actualizado' });
});

app.delete('/usuarios/:id', async (req, res) => {
    await pool.query(
        'DELETE FROM usuarios WHERE id=$1',
        [req.params.id]
    );

    res.json({ mensaje: 'Eliminado' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});