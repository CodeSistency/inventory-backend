const Product = require('../model/Products');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



const getAllProducts = async (req, res) => {
    const product = await Product.find();
    if (!product) return res.status(204).json({ 'message': 'No Product found.' });
    res.json(product);
}

// const createNewProduct = async (req, res) => {

//     const imagenPrimaria = req.file ? req.file.filename : '';

//     if (!req?.body?.titulo || !req?.body?.descripcion || !req?.body?.precio || !req?.body?.tallas) {
//       return res.status(400).json({ 'message': 'Title, description, price, and sizes are required' });
//     }
  
//     try {
//       const result = await Product.create({
//         titulo: req.body.titulo,
//         descripcion: req.body.descripcion,
//         precio: req.body.precio,
//         // imagen_primaria: imagenPrimaria || "",
//         // imagenes_secundarias: req.body.images || [], // Si no se proporciona una imagen, dejar vacío
//         tallas: req.body.tallas,
//       });
  
//       res.status(201).json(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ 'message': 'Internal server error' });
//     }
//   }

// const createNewProduct = async (req, res) => {
//     if (!req?.body?.titulo || !req?.body?.descripcion || !req?.body?.precio || !req?.body?.tallas) {
//           return res.status(400).json({ 'message': 'Title, description, price, and sizes are required' });
//             }
//         console.log(req.body)

//     try {
//         const { titulo, descripcion, precio, tallas } = req.body;
    
//         // Crea un nuevo producto utilizando el modelo Product
//         const newProduct = new Product({
//           titulo,
//           descripcion,
//           precio,
//           tallas,
//         });
    
//         // Guarda el producto en la base de datos
//         const savedProduct = await newProduct.save();
    
//         res.status(201).json(savedProduct);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error al crear el producto' });
//       }
// }

const createNewProduct = async (req, res) => {

    
    const imageFile = req.file;


    // if (!req?.body?.nombre || !req?.body?.descripcion) {
    //     return res.status(400).json({ 'message': 'First and last names are required' });
        
    // }
    console.log(req.body)
    const {nombre, precio, descripcion, cantidad, codigo} = req.body
    console.log(nombre, precio, descripcion, cantidad, codigo)

//     const uniqueFileName = uuidv4() + path.extname(imageFile.originalname);

//   // Define the path to save the image on the server
//   const imagePath = path.join(__dirname, "../public/img", uniqueFileName);
// var reader = new FileReader()
    try {

        // fs.writeFileSync(imagePath, imageFile.buffer);

        const result = await Product.create({
            titulo: nombre,
            descripcion: descripcion,
            precio: precio,
            cantidad: cantidad,
            codigo: codigo,
            
            
            
            
            

        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateProduct = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No Product matches ID ${req.params.id}.` });
    }
    if (req.body?.nombre) product.titulo = req.body.nombre;
    if (req.body?.descripcion) product.descripcion = req.body.descripcion;
    if (req.body?.precio) product.precio = req.body.precio;
    if (req.body?.codigo) product.codigo = req.body.codigo;
    if (req.body?.cantidad) product.cantidad = req.body.cantidad;
   
    
    const result = await Product.findByIdAndUpdate(req.params.id, product);
    res.json(result);
}

// const deleteProduct = async (req, res) => {
    
//     if (!req?.body?.id) return res.status(400).json({ 'message': 'Product ID required.' });
//     console.log(req.body.id)
//     res.json(req?.body?.id)

//     const product = await Product.findOne({ _id: req?.body?.id }).exec();
//     if (!product) {
//         return res.status(204).json({ "message": `No Product matches ID ${req.body.id}.` });
//     }
//     console.log(product)
//     res.json(product)


    
//     const result = await Product.deleteOne({_id: req?.body?.id}); //{ _id: req.body.id }
//     res.json(result);
//     console.log(result)
// }

// backend/controllers/productsController.js

const deleteProduct = async (req, res) => {
    const productId = req.params.id; // Get the product ID from URL parameter
    console.log(productId)
    if (!productId) {
        return res.status(400).json({ 'message': 'Product ID required.' });
    }

    // ... rest of your code ...

    try {
        const product = await Product.findOne({ _id: productId }).exec();
        console.log(product)
        if (!product) {
            return res.status(204).json({ "message": `No Product matches ID ${productId}.` });
        }

        const result = await Product.deleteOne({ _id: productId });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "message": "Server Error" });
    }
};


// const deleteProduct = async (req, res) => {
//     console.log(req?.params)
//     if (!req?.params?.id) return res.status(400).json({ 'message': 'Product ID required.' });

//     const product = await Product.findOne({ _id: req.params.id }).exec();
//     if (!product) {
//         return res.status(204).json({ "message": `No Product matches ID ${req.params.id}.` });
//     }
//     const result = await Product.findByIdAndDelete(req.params.id); //{ _id: req.body.id }
//     res.json(result);
// }

const getProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Product ID required.' });

    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No Product matches ID ${req.params.id}.` });
    }
    res.json(product);
}

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct
}