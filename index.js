const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

/* 🔹 CREATE */
app.post('/usuarios', (req, res) => {
    const { nombre, email } = req.body;

    const sql = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';
    db.query(sql, [nombre, email], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({
            id: result.insertId,
            nombre,
            email
        });
    });
});

/* 🔹 READ ALL */
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results);
    });
});

/* 🔹 READ ONE */
app.get('/usuarios/:id', (req, res) => {
    db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results[0]);
    });
});

/* 🔹 UPDATE */
app.put('/usuarios/:id', (req, res) => {
    const { nombre, email } = req.body;

    const sql = 'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?';
    db.query(sql, [nombre, email, req.params.id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ mensaje: 'Actualizado' });
    });
});

/* 🔹 DELETE */
app.delete('/usuarios/:id', (req, res) => {
    db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ mensaje: 'Eliminado' });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});