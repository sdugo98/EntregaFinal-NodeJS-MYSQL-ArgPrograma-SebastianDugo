Entrega trabajo practico final Trailerflix por el alumno Sebastian Dugo, para el curso de NodeJS orientado a backend, dictado por la Universidad Tres de Febrero.

En este proyecto se podra encontrar el desarrollo de una base de datos MYSQL vinculada a Node JS, el cual contiene información sobre un catalogo de series y peliculas que se pueden encontrar dentro del archivo trailerflix.json.

## Pasos necesarios para poder ejecutar la aplicación correctamente. ##

### 
    ```
1.  Verificar tener instalado NodeJS en la computadora.  De no ser así descargar NodeJS desde el sitio oficial: https://nodejs.org.
    ```

### 2. Instalar los paquetes contenidos por este proyecto a través de node package manager. Este proyecto cuenta con los siguientes paquetes:

-Dotenv
-express
-node
-sequelize
-mysql2

```
Ejecutando en la terminar los comandos:

npm i "(aqui va el nombre de cada paquete)"

```

### 3. Crear un archivo con las variables de entorno, el cual sera un archivo ".env" el cual contendra la siguiente información:

```
DB_NAME=("nombre-de-mi-base-de-datos")
DB_PASSWORD=("contraseña-de-mi-base-de-datos")
DB_USER=root
DB_HOST=localhost

```

### 4. Realizar la configuración de los siguientes archivos:

4.A Archivo "Config.js"

```javascript
require('dotenv').config();

module.exports = {
  database: process.env.DB_NAME || "(nombre-de-mi-base-de-datos)",
  username: process.env.DB_USER || ("mi-nombre-de-usuario"),
  password: process.env.DB_PASSWORD || ("mi-contraseña"),
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT || 'mysql',
};
```
4.B Archivo "sequelize.js"

```javascript
const { Sequelize } = require('sequelize');
const config = require('./config.js');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port, 
    dialect: config.dialect,
  }
);


module.exports = sequelize;
```
### 5. La aplicación debera ejecutarse con los comandos 
``` 
npm start

Y acceder la navegador en la dirección localhost:3000

```

Organización de las tablas dentro de MySQL:

Dentro de la carpeta "vista-tablas" se puede encontrar una imagen con la construcción de la tabla dentro de MySQL.


Explicación de los diferentes endpoints creados:

Obtener todas las categorías existentes en el catalogo:
(Metodo GET/categorias)

Respuesta Exitosa (Status 200 OK):

```json
[
  {
    "id": 0,
    "nombre": "Serie"
  },
  {
    "id": 1,
    "nombre": "Pelicula"
  }
]
```
Respuesta de Error(Status 404):

'Error al obtener las categorías'



----------------------------------



Obtener todo el catalogo completo:
(Metodo GET/catalogo)

Respuesta Exitosa (Status 200 OK)
```json
[
  {
    "id": 1,
    "poster": "./imagenes//posters/1.jpg",
    "titulo": "The Crown",
    "categoria": "Serie",
    "genero": "Drama, Hechos Verídicos",
    "resumen": "Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.",
    "temporadas": 4,
    "reparto": "Claire Fox, Olivia Colman, Matt Smith, Tobias Menzies, Vanesa Kirby, Helena Bonham Carter",
    "trailer": null
  },
  {
    "id": 2,
    "poster": "./imagenes//posters/2.jpg",
    "titulo": "Riverdale",
    "categoria": "Serie",
    "genero": "Drama, Misterio, Ficción",
    "resumen": "El paso a la edad adulta incluye sexo, romance, escuela y familia. Para Archie y sus amigos, también hay misterios oscuros.",
    "temporadas": 5,
    "reparto": "Lili Reinhart, Casey Cott, Camila Mendes, Marisol Nichols, Madelaine Petsch, Mädchen Amick",
    "trailer": null
  }]
  . . .
```

Respuesta de Error (Status 500)

'Error interno en el servidor al intentar traer el catalogo completo.'


----------------------------------



Obtener series o peliculas por su nombre.
(Metodo GET/catalogo/nombre/:nombre)

Respuesta Exitosa (Status 200 OK)

Ejemplo: "localhost:3000/catalogo/nombre/The"


```json

[
  {
    "id": 1,
    "poster": "/posters/1.jpg",
    "titulo": "The Crown",
    "categoria": "Serie",
    "genero": "Drama, Hechos Verídicos",
    "resumen": "Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.",
    "temporadas": 4,
    "reparto": "Claire Fox, Olivia Colman, Matt Smith, Tobias Menzies, Vanesa Kirby, Helena Bonham Carter",
    "trailer": null
  },
  {
    "id": 3,
    "poster": "/posters/3.jpg",
    "titulo": "The Mandalorian",
    "categoria": "Serie",
    "genero": "Fantasía",
    "resumen": "Ambientada tras la caída del Imperio y antes de la aparición de la Primera Orden, la serie sigue los pasos de un pistolero solitario en las aventuras que protagoniza en los confines de la galaxia, donde no alcanza la autoridad de la Nueva República.",
    "temporadas": 2,
    "reparto": "Pedro Pascal, Carl Weathers, Misty Rosas, Chris Bartlett, Rio Hackford, Giancarlo Esposito",
    "trailer": "https://www.youtube.com/embed/aOC8E8z_ifw"
}]
```

Respuesta de Error (Status 404)

"Error al buscar películas o series con el nombre solicitado."


----------------------------------



Obtener series o peliculas por su ID.
(Metodo GET/catalogo/id/:id)


Ejemplo: "localhost:3000/catalogo/id/8"

Respuesta Exitosa (Status 200 OK)

```json
[{
  "id": 8,
  "poster": "/posters/8.jpg",
  "titulo": "Avengers: End Game",
  "categoria": "Película",
  "genero": "Aventura, Ciencia Ficción, Acción",
  "resumen": "Después de los devastadores eventos de los Vengadores: Infinity War (2018), el universo está en ruinas. Con la ayuda de los aliados restantes, los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo.",
  "temporadas": null,
  "reparto": "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner",
  "trailer": null
}]
```

Respuesta de Error (Status 400)

"Error al buscar la película o serie por id:"



----------------------------------


Obtener series o peliculas a través de su genero.
(Metodo GET/catalogo/genero/:genero)

Ejemplo: "localhost:3000/catalogo/genero/Ciencia"


Respuesta Exitosa (Status 200 OK)

```json
[
  {
    "id": 4,
    "poster": "/posters/4.jpg",
    "titulo": "The Umbrella Academy",
    "categoria": "Serie",
    "genero": "Ciencia Ficción, Fantasía",
    "resumen": "La muerte de su padre reúne a unos hermanos distanciados y con extraordinarios poderes que descubren impactantes secretos y una amenaza que se cierne sobre la humanidad.",
    "temporadas": 1,
    "reparto": "Tom Hopper, David Castañeda, Emmy Raver-Lampman, Robert Sheehan, Aidan Gallagher, Elliot Page",
    "trailer": null
  }]

  ```

  Respuesta de Error (Status 404)

  'Error al buscar películas o series por el genero solicitado:'


----------------------------------

Obtener series o peliculas a través de su categoria.

(Metodo GET/catalogo/categoria/:categoria)

Ejemplo: "localhost:3000/catalogo/categoria/Serie"

```json
[{
    "id": 5,
    "poster": "/posters/5.jpg",
    "titulo": "Gambito de Dama",
    "categoria": "Serie",
    "genero": "Drama, Ficción, Sucesos",
    "resumen": "En los cincuenta, una joven de un orfanato descubre que tiene un increíble don para el ajedrez y recorre el arduo camino a la fama mientras lucha contra las adicciones.",
    "temporadas": 1,
    "reparto": "Anya Taylor-Joy, Thomas Brodie-Sangster, Harry Melling, Moses Ingram, Chloe Pirrie, Janina Elkin",
    "trailer": null
  },
  {
    "id": 9,
    "poster": "/posters/9.jpg",
    "titulo": "Juego de tronos",
    "categoria": "Serie",
    "genero": "Aventura, Fantasía, Drama",
    "resumen": "En un mundo fantástico y en un contexto medieval varias familias, relativas a la nobleza, se disputan el poder para dominar el territorio ficticio de Poniente (Westeros) y tomar el control de los Siete Reinos desde el Trono de Hierro, lugar donde el rey ejerce el poder.",
    "temporadas": 8,
    "reparto": "Emilia Clarke, Lena Headey, Sophie Turner, Kit Harington, Peter Dinklage, Nikolaj Coster-Waldau",
    "trailer": null
  }]
  ```

Mensaje de Error (Status 404)

'No se encontraron películas o series con la categoría solicitada.'

