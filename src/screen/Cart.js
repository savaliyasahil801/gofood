import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import '../css/cart.css'
import { useCart, useDispatchCart } from "../component/Contextreducer";
import { ToastContainer, toast } from 'react-toastify';

export default function Cart() {

    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div className="text-light">
                <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
            </div>
        )
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    const handleCheckOut = async () => {
        let Useremail = localStorage.getItem('userEmail');

        let response = await fetch('http://localhost:5000/createorder',{
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: Useremail,
                order_data: data,
                order_date: new Date().toDateString()
            })
        });
        console.log("Order Response : ",response);
        if (response.status === 200) {
            dispatch({ type: "DROP" });
        }

        toast.success("Your Order has been Placed Successfully!", {
            position: "top-center",
            autoClose: 2500,
        });
    }

    return (
        <div className="bg-dark cart">
            <ToastContainer />
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className="table">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((food, index) => (
                                <tr className="text-light">
                                    <th scope="row">{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td><button type="button" className="btn p-0 text-danger" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><RiDeleteBin6Line /></button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <h1 className="text-light fs-2">Total Price : {totalPrice}/-</h1>
                </div>
                <div>
                    <button className="btn bg-success mt-5 text-light" onClick={() => handleCheckOut()}>Checkout</button>
                </div>
            </div>
        </div>
    )
}