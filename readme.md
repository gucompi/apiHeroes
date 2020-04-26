# Api Heroes JS Avanzado


Esta es una api hecha en Express - Node - Mongoose para servidor heroes y servir de backend para el curso de Js Avanzado de gucompi.

  - Obtencion de Token
  - Creacion de Heroes
  - Listado de Heroes
  - Paginado de Heroes

# Nuevas Features!

  - Ahora, solo te deja crear un token por email.
  - Agregué /all/mine para listar heroes creados por el user y /all/pagination para listar de forma paginada.

### Insalacion
Crear archivo .env y colocarle valores a los parametros:
```sh
PORT=8080
USER=
PSW=
DB=
SERVER=

```
```sh
$ git clone https://github.com/gucompi/apiHeroes.git
$ cd apiHeroes
$ npm install
$ npm start
```

#### Heroku
Disponible para deployar en heroku. Importante setear config vars en la plataforma de Heroku!


## Metodos


**POST /token**
``` sh
POST /token
body: {"email":"example@email.com"}

Respuesta:
{token:tokenCreado} # Del tipo "ObjectID"
```


**POST /create**
``` sh
POST /token
body: {
    "name":"name",
    "slug":"slug",
    "powerstatsintelligence":"powerstatsintelligence",
    "powerstatsstrength":"powerstatsstrength",
    "powerstatspeed":"powerstatspeed",
    "powerstatsdurability":"powerstatsdurability",
    "powerstatspower":"powerstatspower",
    "powerstatscombat":"powerstatscombat",
    "appearancegender":"appearancegender",
    "appearancerace":"appearancerace",
    "appearanceheight0":"appearanceheight0",
    "appearanceheight1":"appearanceheight1",
    "appearanceweight0":"appearanceweight0",
    "appearanceweight1":"appearanceweight1",
    "appearanceeyecolor":"appearanceeyecolor",
    "appearancehaircolor":"appearancehaircolor",
    "biographyfullname":"biographyfullname",
    "biographyalterEgos":"biographyalterEgos",
    "biographyaliases0":"biographyaliases0",
    "biographyplaceofbirth":"biographyplaceofbirth",
    "biographyfullname":"biographyfullname"
}
headers:{
    token:"token"
}

Respuesta:
{heroe} # En formato JSON
```


**GET /all**
``` sh
POST /token
headers: {
    token:"token"
}

Respuesta:
{heroes} # En formato JSON, responde TODOS los heroes, los "comunes" y los "propios" al token
```

**GET /all/pagination/:skip/:limit**
``` sh
POST /token
headers: {
    token:"token"
}

Respuesta:
{heroes} # En formato JSON, responde TODOS los heroes, los "comunes" y los "propios" al token. Saltea los heroes del parametro "skip" y limita la respuesta con el parametro "limit"
```


**GET /all/mine**
``` sh
POST /token
headers: {
    token:"token"
}

Respuesta:
{heroes} # En formato JSON, responde unicamente los "propios" al token
```

