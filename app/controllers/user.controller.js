const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

exports.Signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.header("Access-Control-Allow-Origin", "*");
  User.findOne({ email: req.body.email }).then(async (user) => {
    if (user) {
      res.json({
        message: "this email is Already used",
        status: 400,
      });
    } else {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        Phone_number: req.body.Phone_number,
        resident_address: req.body.resident_address,
        Pincode: req.body.Pincode,
        State: req.body.State,
        City: req.body.City,
        Country: req.body.Country,
        user_type: req.body.user_type
      });

      try {
        const savedUsers = await user.save();
        res.json({
          message: "User Created Successfully",
          status: 200,
          data: savedUsers,
        });
      } catch (err) {
        res.json({ message: err, status: 400 });
      }
    }
  });
};

exports.Signin = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  User.findOne({ email: req.body.email }).then(async (user) => {
    if (!user) {
      res.json({
        message: "email not found",
        status: 400,
      });
    } else {
      if (user.password == req.body.password) {
        try {
          res.json({
            message: "User login Successfully",
            status: 200,
            token: jwt.sign(user.id, "dont_be_oversmart"),
            data: user,
          });
        } catch (err) {
          res.json({ message: err, status: 400 });
        }
      } else {
        res.json({
          message: "invalid password",
          status: 400,
        });
      }
    }
  });
};

exports.Edituser = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body, // Updated data from request body
      { new: true, runValidators: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from request params
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from request params
    const user = await User.findById(userId).lean(); // Convert Mongoose document to plain object

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the password field
    delete user.password;

    res.json({
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = process.env.PAGE_LIMIT;
    const filter = {};

    if (page > 1) {
      // Find previous users to get last _id for cursor pagination
      const previousUsers = await User.find()
        .sort({ _id: -1 })
        .limit((page - 1) * limit);

      const lastUser = previousUsers[previousUsers.length - 1];
      if (lastUser) {
        filter._id = { $lt: lastUser._id };
      }
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ _id: -1 })
      .limit(limit);

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const totalUsers = await User.countDocuments();

    res.json({
      status: 200,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalItems: totalUsers,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

