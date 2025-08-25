const user = require('../model/user');
const storage = require('node-persist');
storage.init( /* options ... */);
var jwt = require('jsonwebtoken');

var secret_key = 'BACKEND';

exports.createuser = async (req, res) => {
    try {
        let response = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        console.log(response);
        res.status(200).json({
            status: 200,
            message: "User created successfully",
            data: response
        })
    } catch (error) {
        if (error) throw error
    }
}

exports.login_user = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await user.findOne({ email });
    if (!data) {
      return res.status(400).json({
        status: 400, 
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: data._id, email: data.email },
      secret_key,
      { expiresIn: "24h" }
    );

    await storage.setItem(`login-user-${data._id}`, token);

    return res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data: { id: data._id, name: data.name, email: data.email },
      Token: token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message
    });
  }
};


exports.getuser = async (req, res) => {
    try {
        let response = await user.find();
        console.log(response);
        res.send(response);
    } catch (error) {
        if (error) throw error
    }
}

exports.logout_user = async (req, res) => {
    try {
        await storage.clear();
        res.status(200).json({
            status: 200,
            message: "User logged out successfully"
        });
    } catch (error) {
        if (error) throw error
    }
}