const food = require('../model/foodmodel');

exports.createfood = async (req, res) => {
    let image = req.file.originalname;
    try {
        let response = await food.create({
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            image: image,
            object: req.body.Array,
        });
        console.log(response);
        res.send(response);
    } catch (error) {
        if (error) throw error
    }
}

exports.getfood = async (req, res) => {
    try {
        let response = await food.find();
        console.log(response);
        res.send(response);
    } catch (error) {
        if (error) throw error
    }
}