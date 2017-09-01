const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' , 'hbs');
hbs.registerHelper('getCurrentYear' , () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt' , (text) => {
  return text.toUpperCase();
});

app.use((req , res , next) => {
  res.render('maintanence.hbs' , {
    pageTitle: 'We will be back',
    message: 'Under maintanence'
  });
});
app.use((req , res ,next) => {
  var now = new Date().toString();
  var log = now + req.method + req.url + '';

  console.log(log);
  fs.appendFile('server.log' , log + '\n');
  next();
});
app.use(express.static(__dirname + '/public'));

app.get('/' , (req , res) => {
  res.render('home.hbs' , {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to Home'
  });
});

app.get('/about' , (req , res) => {
  res.render('about.hbs' , {
    pageTitle: 'About Page'
  });
});

app.get('/bad' , (req , res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000);
