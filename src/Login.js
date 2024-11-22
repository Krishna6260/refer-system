import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();


    const Submit = () => {
        if (!email) {
            toast.error("Enter Email!");
        } else if (!password) {
            toast.error("Enter Password!");
        }

        const obj = {
            email: email,
            password: password,
        }

        axios.post('http://localhost:8000/api/auth/login', obj,
            {
                headers: {
                    "Content-Type": "Application/json"
                }
            }).then((response) => {
                console.log(response.data.token)
                if (response.data.success === false) {
                    toast.error("Failed to login!");
                }
                else {
                    Navigate("/Main")
                    localStorage.setItem("token", response.data.token);
                }
            }).catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            Navigate("/Main")
        }
    })

    return (
        <>
            <ToastContainer />
            <div className='container'>

                <div className='login'>

                    <div className='my-5'>
                        <div className=' col-11  m-auto py-5 px-lg-5 px-3  shadow rounded-4 '>
                            <div className='mb-4 text-center'>
                                <span className='display-6'>Login</span>
                            </div>

                            <input placeholder='Username' type='text' onChange={(e) => (setEmail(e.target.value))} className='d-block w-100 mb-4 px-3 py-1 border-0  border-bottom border-1 border-secondary'></input>
                            <input placeholder='Password' type='passowrd' onChange={(e) => (setPassword(e.target.value))} className='d-block w-100 mb-4 px-3 py-1 border-0  border-bottom border-1 border-secondary'></input>

                            <div className='d-flex justify-content-center'>
                                <button className='btn rounded-5 text-white px-5' onClick={() => Submit()} style={{ backgroundColor: 'black' }}>Login</button>
                            </div>
                            <div className='small text-muted mt-4 text-center'>

                                <p>Don't have a Account <Link to='/register'>Register here</Link></p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </>
    )
}

export default React.memo(Login);
