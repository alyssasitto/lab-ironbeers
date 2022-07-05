const { log } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(err => res.send('error'));
});

app.get('/random-beer', async (req, res) => {
  try {
    let myRandomArr = await punkAPI.getRandom();
    // console.log(myRandomArr[0]);
    res.render('random-beer', myRandomArr[0]);
  } catch {
    res.send('error');
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
