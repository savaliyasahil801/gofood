const category = require('../model/category');

exports.createcategory = async (req, res) => {
    try {
        let response = await category.create(req.body);
        console.log(response);
        res.send(response);
    } catch (error) {
        if (error) throw error
    }
}

exports.getcategory = async (req, res) => {
    try {
        let response = await category.find();
        console.log(response);
        res.send(response);
    } catch (error) {
        if (error) throw error
    }
}