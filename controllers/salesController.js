const SalesTracking = require('../model/SalesTracking');
const Product = require('../model/Products');

// Function to calculate the total quantity sold and revenue for a sale

const getAllSales = async (req, res) => {
  const sale = await SalesTracking.find();
  if (!sale) return res.status(204).json({ 'message': 'No Sale found.' });
  res.json(sale);
}

const updateProductQuantity = async (codigo, size, color, quantity) => {
    try {
      const product = await Product.findOne({ codigo });
      if (product) {
        const tallas = product.tallas;
        // tallas[size].find((item) => item.color === color).quantity -= quantity;
        await product.save();
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

// const newSale = async (req, res) => {
//     try {
//         const { productos } = req.body;
//         const savedRecords = [];
//         console.log(productos)
    
//         // Loop through the array of sales data and create a new sales tracking record for each sale
//         for (const product of productos) {
//           const { codigo, titulo, precio, cantidad, sold } = product;
          
//           console.log(product)
//           // Create a new sales tracking record
//           const salesRecord = new SalesTracking({
//             product: {
//               codigo,
//               titulo,
//               precio,
//               sold,
//             },
//             date: new Date(),
//           });
    
//           const savedRecord = await salesRecord.save();
//           savedRecords.push(savedRecord);
    
//           // Update the quantity in the Products model
//           const productToUpdate = await Product.findOne({ codigo });
//       if (productToUpdate) {
//         productToUpdate.cantidad = cantidad; // Update the entire "tallas" object in the product
//         await productToUpdate.save();
//       }
//     }
    
//         return res.status(201).json(savedRecords);
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'An error occurred while creating sales tracking records' });
//       }
// }

const newSale = async (req, res) => {
  try {
    const { referencia, metodo, productos, total } = req.body;

    // Create a new sales tracking record
    const salesRecord = new SalesTracking({
      products: productos,
      referencia,
      metodo,
      total,
      date: new Date()
    });

    const savedRecord = await salesRecord.save();

    // Update the quantity in the Products model
    for (const product of productos) {
      const { codigo, cantidad } = product;
      const productToUpdate = await Product.findOne({ codigo });
      if (productToUpdate) {
        productToUpdate.cantidad = cantidad;
        await productToUpdate.save();
      }
    }

    return res.status(201).json(savedRecord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while creating sales tracking records' });
  }
};

const createNewProduct = async (req, res) => {
    const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

    if (!req?.body?.titulo || !req?.body?.descripcion) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await Product.create({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            tallas: req.body.tallas,
            imagen: ""
            

        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const deleteSale = async (req, res) => {
  const saleId = req.params.id; // Get the product ID from URL parameter
  console.log(saleId)

  if (!saleId) {
      return res.status(400).json({ 'message': 'Product ID required.' });
  }

  // ... rest of your code ...

  try {
      const sale = await SalesTracking.findOne({ _id: saleId }).exec();
      if (!sale) {
          return res.status(204).json({ "message": `No sale matches ID ${saleId}.` });
      }

      console.log(sale)

      for (const product of sale.product) {
        const { codigo, sold } = product;
        const productToUpdate = await Product.findOne({ codigo });

        if (productToUpdate) {
          console.log(productToUpdate)
          productToUpdate.cantidad += sold; // Update the quantity by adding the sold quantity
          await productToUpdate.save();
        }
      }

      const result = await SalesTracking.deleteOne({ _id: saleId });
      res.json(result);
  } catch (err) {
      console.error(err);
      res.status(500).json({ "message": "Server Error" });
  }
}

module.exports = {createNewProduct, newSale, getAllSales, deleteSale}