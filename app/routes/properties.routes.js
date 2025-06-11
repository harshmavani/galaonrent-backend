module.exports = (app, upload) => {
  const { check, validationResult } = require("express-validator");
  const product = require("../controllers/properties.controller.js");
  var authenticate = require("../middleware/authenticate.js");
  var router = require("express").Router();
  var Upload_Image = upload.fields([
      { name: "image", maxCount: 4 },
      { name: "image0", maxCount: 1 },
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
    ]);
  router.post(
    "/createProduct",
    Upload_Image,
    authenticate,
    [check("name").not().isEmpty().trim().escape()],
    // [check("image").not().isEmpty().trim().escape()],
    [check("category").not().isEmpty().trim().escape()],
    [check("new_price").not().isEmpty().trim().escape()],
    // [check("old_price").not().isEmpty().trim().escape()],
    // [check("quantity").not().isEmpty().trim().escape()],
    [check("sku_id").not().isEmpty().trim().escape()],
    product.createProduct
  );
  router.post(
    "/createCustomProduct",
    authenticate,
    product.createCustomProduct
  );
  router.delete(
    "/deleteProduct/:productId", authenticate, product.deleteProduct
  );
  router.put(
    "/editProduct/:productId",Upload_Image,authenticate, product.editProduct
  );
  router.get(
    "/getAllProducts", product.getAllProducts
  );
  router.get(
    "/getProductsByCategory", product.getProductsByCategory
  );
  router.get(
    "/getProduct/:productId", product.getProduct
  );

  app.use("/api/product", router);
};
