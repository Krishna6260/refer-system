import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const refer = urlParams.get("referralCode")

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState(refer);
  const Navigate = useNavigate();


  const Submit = () => {
    if (!username) {
      toast.error("Enter Name!");
    } else if (!email) {
      toast.error("Enter Password!");
    } else if (!password) {
      toast.error("Enter Password!");
    }


    const obj = {
      username: username,
      email: email,
      password: password,
      referralCode: referralCode
    }

    axios.post('http://localhost:8000/api/auth/register', obj,
      {
        headers: {
          "Content-Type": "Application/json"
        }
      }).then((response) => {
        console.log(response.data)
        
          localStorage.setItem("token", response.data.token);
          setEmail('')
          setPassword('')
          setUsername('')
          Navigate("/Main")  
      
      }).catch((error) => {
        console.log(error);
      })
  };

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const referralCode = urlParams.get("referralCode");
  //   // setReferralCode(referralCode)
  //   // if (localStorage.getItem("token")) {
  //   //   Navigate("/Main")
  //   // }
  // })

  return (
    <>
      <ToastContainer />
      <div className='container'>

        <div className='login'>

          <div className='my-5'>
            <div className=' col-11  m-auto py-5 px-lg-5 px-3  shadow rounded-4 '>
              <div className='mb-4 text-center'>
                <span className='display-6'>Registration</span>
              </div>
              <label htmlFor="" className="form-label">Username</label>
              <input placeholder='Username' type='text' onChange={(e) => (setUsername(e.target.value))} value={username} className='d-block w-100 mb-4 px-3 py-1 border-0  border-bottom border-1 border-secondary'></input>
              <label htmlFor="" className="form-label">Email</label>
              <input placeholder='Email' type='email' onChange={(e) => (setEmail(e.target.value))} value={email} className='d-block w-100 mb-4 px-3 py-1 border-0  border-bottom border-1 border-secondary'></input>
              <label htmlFor="" className="form-label">Password</label>
              <input placeholder='Password' type='passowrd' onChange={(e) => (setPassword(e.target.value))} value={password} className='d-block w-100 mb-4 px-3 py-1 border-0  border-bottom border-1 border-secondary'></input>
              <label htmlFor="" className="form-label">Refferal Code</label>
              <input placeholder='Refferal Code' type='text' onChange={(e) => (setReferralCode(e.target.value))} value={referralCode} className='d-block w-100 mb-4 px-3 py-1 border-0  border-bottom border-1 border-secondary'></input>

              <div className='d-flex justify-content-center'>
                <button className='btn rounded-5 text-white px-5' onClick={() => Submit()} style={{ backgroundColor: 'black' }}>Register</button>
              </div>
              <div className='small text-muted mt-4 text-center'>

                <p>Gave a Account <Link to='/'>Login</Link></p>
              </div>
            </div>
          </div>

        </div>

      </div>


    </>
  )
}

export default React.memo(Registration);

