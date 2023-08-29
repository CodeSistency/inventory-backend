const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../../controllers/productsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
      cd(null, 'public')
    },
    filename: (req, file, cd) => {
      cd(null, Date.now() + '-' + file.originalname)
    },
  })
  
  const upload = multer({ storage: storage })

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// upload.single("image"),

router.route('/')
    .get(productController.getAllProducts)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),  productController.createNewProduct)
    // .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productController.updateProduct)
    // .delete(verifyRoles(ROLES_LIST.Admin), productController.deleteProduct);
    

router.route('/:id')
    .get(productController.getProduct)
    .delete(verifyRoles(ROLES_LIST.Admin),  productController.deleteProduct)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productController.updateProduct)
    // .put(verifyRoles(ROLES_LIST.Admin), productController.updateProduct);
    

    

module.exports = router;