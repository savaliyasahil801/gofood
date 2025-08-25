import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../css/header.css'
import Badge from 'react-bootstrap/Badge';

import { RiLogoutCircleRLine } from "react-icons/ri";
import Model from '../Model';
import Cart from '../screen/Cart';
import { useCart } from './Contextreducer';

const Header = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [cartView, setCartView] = useState(false);
    let data = useCart();

    const logout = async () => {
        if (!user) return;
        const id = user.id;
        console.log(id);
        await fetch(`http://localhost:5000/logout/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('user_id');

        setUser(null);
    }

    return (
        <div>
            <Navbar expand="lg" className="bg-success">
                <Container>
                    <Navbar.Brand className='text-light fw-bold fs-1 fst-italic'>GoFood</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="text-light w-100 d-flex">
                            <ul className='navbar-nav me-auto mb-2'>
                                <li className='nav-item me-3'><Link className='active me-auto fs-5 mb-2 text-light' to="/" style={{ textDecoration: 'none' }}>Home</Link></li>
                                {(localStorage.getItem('token')) ? (
                                    <li className='nav-item'>
                                        <Link className='me-auto fs-5 mb-2 text-light' to="/myOrder" style={{ textDecoration: 'none' }}>My Orders</Link>
                                    </li>
                                ) : ""}
                            </ul>
                            <div>
                                {
                                    (!localStorage.getItem('user')) ? (
                                        <>
                                            <Link className='btn bg-white text-success mx-1' to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                                            <Link className='btn bg-white text-success mx-1' to="/register" style={{ textDecoration: 'none' }}>Register</Link>
                                        </>) :
                                        (
                                            <>
                                                <div className='user_main_box'>
                                                    <div>
                                                        <Link className='btn bg-white text-success mx-1' onClick={() => setCartView(true)} style={{ textDecoration: 'none' }}>
                                                            Cart
                                                            <Badge pill bg="danger" className='ms-1'> {data.length} </Badge>
                                                        </Link>
                                                    </div>
                                                    {cartView ? (
                                                        <Model onClose={() => setCartView(false)} ><Cart /></Model>
                                                    ) : null}
                                                    <div className='d-flex justify-content-center align-items-center'>
                                                        <button className='btn bg-white text-danger ms-2 fs-5 d-flex justify-content-center align-items-center' style={{ height: "40px" }} onClick={() => logout()}><RiLogoutCircleRLine /></button>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
