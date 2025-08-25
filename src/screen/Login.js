import React, { useState } from 'react'
import '../css/login.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showpassword, setShowPassword] = useState(false);

    const handlesubmit = async () => {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await response.json();
        console.log("data : ", data);
        console.log(data.Token);
        console.log("data.data : ",data.data);
        if (response.ok && data.status === 200) {
            localStorage.setItem('token', data.Token);
            localStorage.setItem('userEmail', data.data.email);
            localStorage.setItem('user', JSON.stringify(data.data));
            console.log("token : ", data.Token);
            toast.success("Successfully Logged in..!", {
                position: "top-center",
                autoClose: 3000,
                onClose: () => navigate('/')
            });
        } else {
            toast.error("Check your email and password", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    }

    return (
        <div className='login_page'>
            <div className='container'>
                <ToastContainer />
                <div className='form_wrapper d-flex justify-content-center align-items-center'>
                    <div className='form'>
                        <div className="row">
                            <div className="col">
                                <h3>Login</h3>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col">
                                <input type="email" placeholder='email' name="email" className='form-control mt-3 mb-2' required value={email} onChange={(e) => setemail(e.target.value)} />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <input type={showpassword ? 'text' : 'password'} placeholder='password' name="password" className='form-control mt-2 mb-2' required value={password} onChange={(e) => setpassword(e.target.value)} />
                                <div>
                                    <input type="checkbox" onChange={() => setShowPassword(!showpassword)} value={showpassword} className="form-check-input me-2"
                                        id="showPassword" style={{ cursor: 'pointer' }} />
                                    <label className="form-check-label" htmlFor="showPassword" style={{ cursor: 'pointer' }}>
                                        Show Password
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mt-3 d-flex justify-content-center">
                                <button className='btn btn-primary login_btn' onClick={() => handlesubmit()}>Login</button>
                            </div>
                        </div>
                        <p className='m-0 d-flex justify-content-center'>or</p>
                        <div>
                            <p className='m-0 d-flex justify-content-center'>you don't have an account</p>
                            <Link to="/register" className='m-0 d-flex justify-content-center text-decoration-none'>please register first</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
