import React, { useState } from 'react';


import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [login, setLogin] = useState({
  
    email: '',
    password: ''
  });
const Navigate = useNavigate()
  const handler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const {  email, password } = login;
  
    if ( !email || !password) {
      alert('Please fill out all fields.');
    } else {
      // Make a POST request to the server
      axios.post('http://localhost:5000/auth/login', {
       
        email: email,
        password: password
      })
      .then(response => {
          // Extract the token from the response
      const { jwtToken,name } = response.data;
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('logedInUser', name);
        console.log(response.data);
        alert('Login successful!');
        Navigate("/home")
      })
      .catch(error => {
        // Handle any errors here
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(error.response.data.message); // Show the error message from the server
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
      
    }
  };
  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input type='email' 
            name='email' 
            placeholder='Enter your email' 
            value={login.email}
            onChange={handler}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type='password'
            name='password'
            placeholder='Enter your password' 
            value={login.password}
            onChange={handler}/>
        </div>
        <button type='submit'>Login</button>

       
      </form>
   
    </div>
  );
}

export default Login;
