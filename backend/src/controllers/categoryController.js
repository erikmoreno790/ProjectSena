// Importamos el modelo de categoría y el servicio de autenticación
const Category = require('../models/Category');
const authService = require('../services/authService');

// Controlador para crear una nueva categoría
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para obtener todas las categorías
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('servicios');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener una categoría por su ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('servicios');
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar una categoría por su ID (requiere autenticación)
exports.updateCategory = async (req, res) => {
  try {
    // Verificamos el token y obtenemos el ID del usuario
    const userId = authService.verifyToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Token inválido o no proporcionado' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar una categoría por su ID (requiere autenticación)
exports.deleteCategory = async (req, res) => {
  try {
    // Verificamos el token y obtenemos el ID del usuario
    const userId = authService.verifyToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Token inválido o no proporcionado' });
    }

    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
