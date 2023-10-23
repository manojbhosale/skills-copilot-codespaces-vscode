// create web server

// create web server
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// load data
const comments = require('./comments.json');

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use static files
app.use(express.static(path.join(__dirname, 'public')));

// use body parser
app.use(express.urlencoded({ extended: false }));

// use express session
const session = require('express-session');
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// use connect flash
const flash = require('connect-flash');
app.use(flash());

// use passport
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// passport config
const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// define routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home page' });
});

app.get('/comments', (req, res) => {
  res.render('comments', { title: 'Comments page', comments: comments });
});

app.get('/comments/new', (req, res) => {
  res.render('new', { title: 'New comment' });
});

app.post('/comments/new', (req, res) => {
  const newComment = {
    name: req.body.name,
    comment: req.body.comment
  };

  comments.push(newComment);
  res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments[id];

  res.render('show', { title: 'Comment', comment: comment });
});

app.get('/comments/:id/edit', (req, res) => {
  const id = req.params.id;
  const comment = comments[id];

  res.render('edit', { title: 'Edit comment', comment: comment });
});

app.post('/comments/:id/edit', (req, res) => {
  const id = req.params.id;
  const comment = comments[id];

  comment.name = req.body.name;
  comment.comment = req.body.comment;

  res.redirect('/comments');
});

app.get('/comments/:id/delete', (req, res