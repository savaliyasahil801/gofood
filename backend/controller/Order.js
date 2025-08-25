const Order = require('../model/Orders');

exports.createorder = async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { order_date: req.body.order_date });

    let eId = await Order.findOne({ 'email': req.body.email });
    console.log(eId);
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({
                    status: 200,
                    success: true
                })
            })
        } catch (error) {
            console.log(error.message);
            res.send("Server error", error.message);
        }
    } else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({
                        status: 200,
                        success: true
                    })
                })
        } catch (error) {
            res.send("Server error", error.message);
        }
    }
}

exports.getOrder = async (req, res) => {
    try {
        let response = await Order.find({ email: req.body.email });
        console.log(response);
        res.send(response);
    } catch (error) {
        if (error) throw error
    }
}