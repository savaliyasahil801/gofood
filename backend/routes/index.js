var express = require('express');
var router = express.Router();
var user = require('../controller/usercontroller');
var food = require('../controller/fooditem');
var category = require('../controller/foodcategory');
var multer = require('multer');
var Order = require('../controller/Order');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

/* For user */
router.post('/create', user.createuser);
router.post('/login', user.login_user);
router.get('/logout/:id', user.logout_user);
router.get('/get', user.getuser);

// For Food
router.post('/createfood', upload.single('image'), food.createfood);
router.get('/getfood', food.getfood);

// For Category
router.post('/createcategory', category.createcategory);
router.get('/getcategory', category.getcategory);

// For Order
router.post('/createorder', Order.createorder);
router.post('/getorder', Order.getOrder);

module.exports = router;
