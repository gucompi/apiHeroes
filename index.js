
var express    = require('express');        // Utilizaremos express, aqui lo mandamos llamar

var app        = express();                 // definimos la app usando express
var bodyParser = require('body-parser'); //

var mongoose = require('mongoose'); // Utilizamos la librería de mongoose
//Creamos la conexión con mongo
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PSW}@${process.env.SERVER}/${process.env.DB}`).then(()=>{
    // configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    var port = process.env.PORT || 8080;        // seteamos el puerto
    
    var router = express.Router();   //Creamos el router de express
    
    let Heroe = require("./heroe.model")
    let Token = require("./token.model")
    let cors = require('cors')
    app.use(cors())

    // Seteamos la ruta principal
    router.get('/all/mine', function(req, res) {
        Heroe.find({"tokenAsociado":req.headers.token}).then((heroesFinded)=>{
            return res.json(heroesFinded).status(200)
        }).catch((err)=>{
            return res.json({err:"Error al buscar tus heroes"}).status(500)
        })
    });
    router.get('/all/pagination/:skip?/:limit?',(req,res)=>{
        Heroe.find({$or:[{"tokenAsociado":null},{"tokenAsociado":req.headers.token}]})
        .skip(parseInt(req.params.skip))
        .limit(parseInt(req.params.limit)).then((heroesFinded)=>{
                if(!heroesFinded)
                return res.json({err:"No se encontraron heroes."}).status(404)
                return res.json(heroesFinded).status(200)
            }).catch((err)=>{
                return res.json({err:err}).status(500)
            })
    })

// Seteamos la ruta principal
router.post('/create', function(req, res) {
    if(!req.headers.token || req.headers.token=="" || !mongoose.isValidObjectId(req.headers.token))
        return res.json({err:"Token invalido, inexistente o vacio"}).status(403)
    if(!req.body.name|| req.body.name=="") 
        return res.json({err:"No se puede crear un heroe sin nombre"}).status(402)

    Heroe.count({tokenAsociado:req.headers.token}).then((cant)=>{
        if(cant>100) return res.json({err:"Tu token ya tiene 100 heroes Asociados."}).status(201)
    }).then(()=>{
        
        Heroe.findOne({name:req.body.name}).then((heroeFinded)=>{
            if(heroeFinded) res.json({err:"Ya existe un heroe con ese nombre"}).status(402)
            Heroe.create({
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
                return res.json(heroeCreated).status(200)
            }).catch((err)=>{
                return res.json({err:"Error al crear heroe"}).status((500))
            })
        }).catch((err)=>{
            return res.json({err:"Error al procesar tu solicitud."}).status(500)
        })
    }).catch((err)=>{
        return res.json({err:"Error al procesar tu solicitud."}).status(500)
    })
});

// Seteamos la ruta principal
router.post('/token', function(req, res) {
    if(!req.body.email || req.body.email=="")
        return res.json({err:"Para solicitar tu token, debes enviar tu email"}).status(401)    
    Token.findOne({email:req.body.email}).then((tokenFinded)=>{
        if(tokenFinded) res.json({token:tokenFinded._id}).status(200)
        Token.create({email:req.body.email}).then((tokenCreated)=>{
            return res.json({token:tokenCreated._id}).status(200)
        }).catch((err)=>{
            return res.json({err:"Error al crear Token"}).status(500)
        })
    }).catch((err)=>{
        return res.json({err:"Error al buscar Token para tu email"}).status(500)
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
