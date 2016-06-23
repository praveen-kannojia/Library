var express = require('express');

var adminRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var books1 = [
    {
        title:'War and Peace',
        genre:'Historical Fiction',
        author:'Lev Farnandis',
        read:false
    },
    {
        title:'Independance Day',
        genre:'History',
        author:'Dev and Eli',
        read:false
    },
    {
        title:'My Family',
        genre:'Family Drama',
        author:'Nancy Powel',
        read:false
    },
    {
        title:'Nerd Machine',
        genre:'Family Drama',
        author:'Dren Brown',
        read:false
    }
];

var router = function(nav){
    
    adminRouter.route('/addBooks')
        .get(function(req,res){
       var url = 'mongodb://localhost:27017/libraryApp';
        
        mongodb.connect(url, function(err,db){
            var collection = db.collection('books');
            collection.insertMany(books1, function(err,results){
                res.send(results);
                db.close();
            });
            
        });
        
        
       //res.send('inserting book') ;
    });
    
  return adminRouter;  
};

module.exports = router;
