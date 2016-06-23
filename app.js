var express = require('express');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var session = require('express-session');



var nav1 = [{
            'Link':'/Books',
            'Text':'Books'
        },{
            'Link':'/Authors',
            'Text':'Authors'
        }];

var bookRouter = require('./src/routes/bookRoute');

var adminRouter = require('./src/routes/adminRoute')(nav1);
var authRouter = require('./src/routes/authRoute');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());
app.use(session({secret:'library'}));

require('./src/config/passport')(app);

app.set('views','./src/views');
app.set('view engine','ejs');
app.use('/Books',bookRouter);
app.use('/Admin',adminRouter);
app.use('/auth',authRouter);


app.get('/', function (request, response) {
    response.render('index',{
        title:'hello from caller',
        nav:[{
            'Link':'/Books',
            'Text':'Books'
        },{
            'Link':'/Authors',
            'Text':'Authors'
        }]});
});

app.get('/books', function (request, response) {
    response.send('hello books');
});


var port = process.env.PORT || 8080;
app.listen(port, function (err) {
    console.log('running server on port : ' + port);
});