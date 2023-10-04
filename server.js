const express = require('express');
const app = express();
const { Sequelize, Op } = require('sequelize');
const config = require('./config');
const path = require('path');
const Categorias = require(path.join(__dirname, './models/categorias'));
const CatalogoView = require(path.join(__dirname, './models/catalogoview'));
const Catalogo = require(path.join(__dirname,"./models/catalogo.js"));

// Middleware que mostrara cada petición por consola
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

// Conectar a base de datos
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

// Funcion de sincronización de los modelos
const syncModels = async () => {
  try {
    await Categorias.sync();
    await Catalogo.sync();
    console.log('Modelos sincronizados correctamente');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
};

syncModels();


// Rutas creadas
app.get('/categorias', async (req, res) => {
  try {
    const categorias = await Categorias.findAll();
    if (categorias.length === 0) {
      // Al no encontrar categorias que coincidan responde con el siguiente mensaje
      res.json({ message: 'No hay categorías disponibles' });
    } else {
      res.json(categorias);
    }
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener las categorías.' });
  }
});

// Función para construir la ruta de la imagen
const construirRutaImagen = (nombreImagen) => {
  return `./imagenes/${nombreImagen}`;
};

app.get('/catalogo', async (req, res) => {
  try {
    const catalogoCompleto = await Catalogo.findAll();
    const catalogoConRutaImagen = catalogoCompleto.map((item) => {
      return item.poster
        ? { ...item.toJSON(), poster: construirRutaImagen(item.poster) }
        : item.toJSON();
    });
    res.json(catalogoConRutaImagen);
  } catch (error) {
    console.error('Error al obtener el catálogo completo:', error);
    res.status(500).json({ error: 'Error interno en el servidor al intentar traer el catalogo completo.' });
  }
});

app.get('/catalogo/id/:id', async (req, res) => {
// obtener id a través de params
  const id = req.params.id;
  
  try {
    // A través de Sequelize se buscara la pk para coincidir el resultado
    const resultado = await Catalogo.findByPk(id);
    
    if (resultado) {
      //Dar resultado en formato JSON
      res.json(resultado);
    } else {
      // Si no se encuentra, responde con el correspondiente mensaje de error
      res.status(404).json({ error: 'No se encontró ninguna película o serie con el id solicitado.' });
    }
  } catch (error) {
    console.error('Error al buscar la película o serie por id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.get('/catalogo/nombre/:nombre', async (req, res) => {
  const nombre = req.params.nombre;
  try {
    const resultados = await Catalogo.findAll({
      where: {
        titulo: {
          [Op.like]: `%${nombre}%`,
        },
      },
    });
    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.status(404).json({ error: 'No se encontraron películas o series el nombre solicitado.' });
    }
  } catch (error) {
    console.error('Error al buscar películas o series con el nombre solicitado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/catalogo/genero/:genero', async (req, res) => {
  const genero = req.params.genero;
  try {
    const resultados = await Catalogo.findAll({
      where: {
        genero: {
          [Op.like]: `%${genero}%`,
        },
      },
    });
    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.status(404).json({ error: 'No se encontraron películas o series con el genero solicitado.' });
    }
  } catch (error) {
    console.error('Error al buscar películas o series por el genero solicitado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/catalogo/categoria/:categoria', async (req, res) => {
  const categoria = req.params.categoria;
  try {
    const resultados = await Catalogo.findAll({
      where: {
        categoria: {
          [Op.like]: `%${categoria}%`,
        },
      },
    });
    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.status(404).json({ error: 'No se encontraron películas o series con la categoría solicitada.' });
    }
  } catch (error) {
    console.error('Error al buscar películas o series con la categoría solicitada:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Constante para escuchar el puerto "PORT"
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});