var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


/* GET kunde page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("BECBank");
    dbo.collection("kunder").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.render('kunder', result);
    });
  });
  
});

/* GET kunder as JSON. */
router.get('/kunder', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("BECBank");
    dbo.collection("kunder").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result);
    });
  });
  
});
/*Post requests opretter ny kunde*/ 
router.post('/insertkunder', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("BECBank");

    var object = { 
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      accno: req.body.accno,
      balance: req.body.balance,
      rate: req.body.rate,
    };
    
    dbo.collection("kunder").insertOne(object, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    res.redirect('/kunder');
  });
})




module.exports = router;
