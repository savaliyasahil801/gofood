import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/itemcart.css';

import { useDispatchCart, useCart } from './Contextreducer';

// import img1 from "../images/pizza-paneer-tikka.webp";


const ItemCart = (props) => {

    let options = props.option;
    let objectoptions = Object.keys(options);
    let priceRef = useRef();

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let dispatch = useDispatchCart();
    let data = useCart();

    const handleaddtocart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.image });
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.image });
        // console.log(data);
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <Card className='mt-3 bg-transparent text-light border-secondary' style={{ width: '18rem', maxHeight: '400px' }}>
                <Card.Img variant="top" src={`http://localhost:5000/images/${props.foodItem.image}`} alt={props.foodItem.name} className='card_image' />
                <Card.Body>
                    <Card.Title>{props.foodItem.name}</Card.Title>
                    {/* <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text> */}
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success text-light' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100 bg-success text-light' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                objectoptions.map((e) => {
                                    return (
                                        <option key={e} value={e}>{e}</option>
                                    )
                                })
                            }
                        </select>

                        <div className='d-inline h-100 fs-5 text-light'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <Button className='mt-2 w-100' variant="success" onClick={() => handleaddtocart()}>Add to Cart</Button>
                </Card.Body>
            </Card>
        </div >
    )
}

export default ItemCart
