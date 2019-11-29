const express = require('express');
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')


const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb+srv://jess:JL731996@cluster0-cfgis.mongodb.net/test?retryWrites=true&w=majority', (err, database) => {
    if (err) return console.log(err)
    db = database.db('wordball')

    app.listen(3000, function() {
      console.log('listening on 3000')
    })
  })

  app.get('/', function(req, res) {
    res.sendFile('/index.html')
  })

  app.get('/leaderboard', function(req, res) {
    db.collection('scores').find()
      .toArray(function(err, results) {
      res.render('index.ejs', {scores: results})
    })
  })

app.post('/scores', (req, res) => {
  db.collection('scores').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})
