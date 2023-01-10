var express = require('express');
var app = express();
var MongoDB = require('mongodb');
var mongoc = MongoDB.MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const path = require('path'); 
const router = express.Router(); 
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
swaggerDocument=require('./swagger.json');
const { urlencoded } = require('express');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static(path.join(__dirname, 'src')));


router.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname + '/public/index.html')); 
});

router.get('/index/add', function(req,res){
    res.sendFile(path.join(__dirname + '/public/add.html'));
});

router.get('/index/search', function(req,res){
    res.sendFile(path.join(__dirname + '/public/search.html'))
})


app.get('/allMatches', function (req, res) {

    mongoc.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Zaliczenie");
        dbo.collection("Matches").find().toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.end(JSON.stringify(result));
            db.close();
        });
    });
})

app.post('/addMatch', function (req, res) {
    mongoc.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Zaliczenie");
        const dane = req.body;
        dbo.collection("Matches").insertOne(dane, function (err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            res.end(JSON.stringify(result));
            db.close();
        });
    });
})



app.get("/search/:team", function (req, res){
    // #swagger.description = 'Pobiera mecze o podanej nazwie drużyny'
    // #swagger.tags = ['Szukanie Meczu drużyny']
    // #swagger.parameters['team'] = { description: 'ID uzytkownika' }
    mongoc.connect("mongodb://127.0.0.1:27017/", function (err, db){
    if (err) throw err;
    var dbo = db.db("Zaliczenie");
    var query = { $or:[{HomeTeam: req.params.team},{AwayTeam:req.params.team}]};
    dbo.collection("Matches").find(query).toArray(function(err,result) {
        if(err) throw err;
        console.log(result);
        res.end(JSON.stringify(result));
        db.close();
    });
});
})

app.use('/', router); 
app.listen(3000, () => {
    console.log("Server started");
});

