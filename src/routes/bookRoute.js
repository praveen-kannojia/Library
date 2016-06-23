var express = require('express');

var bookRouter = express.Router();

var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;



var nav = [{
            'Link':'/Books',
            'Text':'Books'
        },{
            'Link':'/Authors',
            'Text':'Authors'
        }];


var bookController = require('../controllers/bookController')(null, nav);

bookRouter.use(bookController.middleware);

    


bookRouter.route('/')
    .get(bookController.getIndex);

bookRouter.route('/:id')
    .get(bookController.getById);


module.exports = bookRouter;
