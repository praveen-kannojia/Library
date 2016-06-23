var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;


var User1 = 
    [
        {username:'admin', password: 'pwd'},
        {username:'test', password: 'pwd'},
        {username:'guest', password: 'pwd'}
    ];

module.exports = function(){
    
    passport.use(new LocalStrategy(
    
    function(username, password, done) {
        
        var url = 'mongodb://localhost:27017/libraryApp';
         mongodb.connect(url, function(err,db){
            var collection = db.collection('users');
            collection.findOne({
                username: username
            },
            function(err,results){
                if(results.password === password){
                    var user = results;
                    done(null, user);        
                }else{
                    done(null, false, {message : 'Bad Password'});
                }                
                
            });
            
        });        
       
    
  }
)); 
    
    
  
  
};
