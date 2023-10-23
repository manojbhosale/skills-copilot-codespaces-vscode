// create web server

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const comments = [
    { username: 'Tam', comment: 'Hello' },
    { username: 'Nam', comment: 'Hi' }
];

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/comments', (req, res) => {
    const newComment = {
        username: req.body.username,
        comment: req.body.comment
    };
    comments.push(newComment);
    res.json(comments);
});

app.get('/comments', (req, res) => res.json(comments));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));