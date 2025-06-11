module.exports = (app) => {
  const { check, validationResult } = require("express-validator");
  const user = require("../controllers/user.controller.js");
  var authenticate = require("../middleware/authenticate.js");
  var router = require("express").Router();

  router.post(
    "/Signup",
    [
      check("email").not().isEmpty().trim().escape(),
      check("password").not().isEmpty().trim().escape(),
      check("first_name").not().isEmpty(),
      check("last_name").not().isEmpty(),
      check("Phone_number").not().isEmpty(),
      check("resident_address").not().isEmpty(),
      check("Pincode").not().isEmpty(),
      check("State").not().isEmpty(),
      check("City").not().isEmpty(),
      check("Country").not().isEmpty(),
    ],
    user.Signup
  );

  router.post(
    "/Signin",
    [
      check("email").not().isEmpty().trim().escape(),
      check("password").not().isEmpty().trim().escape(),
    ],
    user.Signin
  );
  router.put(
    "/Edituser/:userId",
    authenticate,
    [check("userId").not().isEmpty().trim().escape()],
    user.Edituser
  );
  router.delete(
    "/Deleteuser/:userId", authenticate, user.deleteUser
  );
  router.get(
    "/getUser/:userId",authenticate, user.getUser
  );
  router.get(
    "/getAllUsers",authenticate, user.getAllUsers
  );

  app.use("/api/user", router);
};
