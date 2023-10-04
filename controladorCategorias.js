const { Categoria } = require('./models'); 

// Función para crear una nueva categoría
exports.createCategoria = async (req, res) => {
  try {
    const nuevaCategoria = await Categoria.create(req.body); 
    res.status(201).json(nuevaCategoria); 
  } catch (error) {
    console.error('Error al crear una categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener todas las categorías
exports.getAllCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();  // Encontrar a todas las categorías
    res.json(categorias); 
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
