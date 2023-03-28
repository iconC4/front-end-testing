const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname + '/views'));

const base_url = "http://localhost:3000";

///////////////////////////////////////////////////////////
/// SHELVES
app.get('/', async (req, res) => {
    const shelves = await axios.get(base_url + '/shelves');
    res.render('shelves', { shelves: shelves.data });
});

app.get('/shelves_post', async (req, res) => {
    res.render('shelves_post');
});

app.post('/shelves_post', async (req, res) => {
    const post = await axios.post(base_url + '/shelves', req.body)
    res.redirect('/')
});

app.listen(5500, () => console.log("localhost: 5500"));