import React, { useState } from 'react'
import '../css/register.css'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handlesubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            const data = await response.json();
            console.log("data : ", data);
            if (response.ok && data.status === 200) {
                toast.success("Successfully Registered..!", {
                    position: "top-center",
                    autoClose: 2000, // shorter auto close
                    onClose: () => navigate('/login')
                });
            } else {
                toast.error(data.message || "Registration failed", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className='register_page'>
            <div className='container'>
                <ToastContainer />
                <div className='form_wrapper d-flex justify-content-center align-items-center'>
                    <div className='form'>
                        <h3>Register</h3>

                        <input
                            type="text"
                            placeholder='Name'
                            className='form-control mt-3 mb-3'
                            required
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder='Email'
                            className='form-control mt-3 mb-3'
                            required
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />

                        <div className="mb-3 position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Password'
                                className='form-control'
                                required
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                            <div className="form-check mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <label className="form-check-label" htmlFor="showPassword" style={{ cursor: 'pointer' }}>
                                    Show Password
                                </label>
                            </div>
                        </div>

                        <button className='btn btn-primary w-100' onClick={() => handlesubmit()}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
