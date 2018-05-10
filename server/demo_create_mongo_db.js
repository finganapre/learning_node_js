var mongo = require('mongodb');

// Create DB
var MongoClient = require('mongodb').MongoClient;
var urlBd = "mongodb://localhost:27017/mydb";

MongoClient.connect(urlBd, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});