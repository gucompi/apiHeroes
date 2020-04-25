
var express    = require('express');        // Utilizaremos express, aqui lo mandamos llamar

var app        = express();                 // definimos la app usando express
var bodyParser = require('body-parser'); //

var mongoose = require('mongoose'); // Utilizamos la librería de mongoose
//Creamos la conexión con mongo
mongoose.connect('mongodb+srv://gucompi:Test123@gucompi-0xprj.gcp.mongodb.net/heroes?authSource=heroes').then(()=>{
    // configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    var port = process.env.PORT || 8080;        // seteamos el puerto

    var router = express.Router();   //Creamos el router de express



    // Seteamos la ruta principal
    router.get('/all', function(req, res) {
        let heroesModel = require("./heroes.model")
       
        heroesModel.find({$or:[{"tokenAsociado":null},{"tokenAsociado":req.headers.token}]}).then((finded)=>{
            res.send({res:finded})
        })        
    });


// Seteamos la ruta principal
router.post('/create', function(req, res) {
    let heroesModel = require("./heroes.model")
    console.log(req.body)
   heroesModel.create({
        name:req.body.name,
        slug:req.body.slug,
        "powerstats/intelligence":req.body.powerstatsintelligence,

        "powerstats/strength":req.body.powerstatsstrength,
        "powerstats/speed": req.body.pwerstatspeed,
        "powerstats/durability": req.body.powerstatsdurability,
        "powerstats/power": req.body.powerstatspower,
        "powerstats/combat": req.body.powerstatscombat,
        "appearance/gender": req.body.appearancegender,
        "appearance/race": req.body.appearancerace,
        "appearance/height/0":req.body.appearanceheight0,
        "appearance/height/1": req.body.appearanceheight1,
        "appearance/weight/0": req.body.appearanceweight0,
        "appearance/weight/1":req.body.appearanceweight1,
        "appearance/eyeColor": req.body.appearanceeyecolor,
        "appearance/hairColor": req.body.appearancehaircolor,
        "biography/fullName":req.body.biographyfullname,
        "biography/alterEgos": req.body.biographyalterEgos,
        "biography/aliases/0": req.body.biographyaliases0,
        "biography/placeOfBirth":req.body.biographyplaceofbirth,
        "biography/firstAppearance": req.body.biographyfullname,


        tokenAsociado:req.headers.token
    }).then((heroeCreated)=>{
       res.json(heroeCreated)
   }).catch((err)=>{
       res.json(err)
   })
});

// Seteamos la ruta principal
router.post('/token', function(req, res) {
    let tokenModel = require("./token.model")
    
   tokenModel.create({email:req.body.email}).then((token)=>{
       res.json(token).status(200)
   }).catch((err)=>{
       res.json(err).status(500)
   })
});




    // Le decimos a la aplicación que utilize las rutas que agregamos
    app.use('/', router);

    // Iniciamos el servidor
    app.listen(port);
    console.log('Aplicación creada en el puerto: ' + port);
}).catch((err)=>{
    console.log(err)
});
