const express = require('express');
const bodyParser = require('body-parser');
const speakeasy = require('speakeasy');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route untuk file ads.txt
app.get('/agin.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'agin.txt'));
});

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.render('index', { secret: '', token: null });
});

// API route untuk generasi token
app.post('/api/generate', (req, res) => {
    let secret = req.body.secret.replace(/\s/g, ''); // Menghapus spasi dari secret key
    const token = speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    });
    res.json({ token: token });
});

// Menjalankan server di port 80
app.listen(80, () => {
    console.log('Server is running on http://localhost:80');
});
