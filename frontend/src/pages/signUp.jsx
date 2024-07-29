import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [signUp, setsignUp] = useState({
    name: '',
    email: '',
    password: ''
  });
const Navigate = useNavigate()
  const handler = (e) => {
    const { name, value } = e.target;
    setsignUp({ ...signUp, [name]: value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { name, email, password } = signUp;
  
    if (!name || !email || !password) {
      alert('Please fill out all fields.');
    } else {
      // Make a POST request to the server
      axios.post('http://localhost:5000/auth/signUp', {
        name: name,
        email: email,
        password: password
      })
      .then(response => {
        // Handle the response from the server
     
          console.log(response.data);
          alert('SignUp successful!');
          Navigate("/login")
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
      <h1>SignUp</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="name">Name</label>
          <input type='text' 
            name='name' 
            autoFocus
            placeholder='Enter your name'
            value={signUp.name}
            onChange={handler}/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type='email' 
            name='email' 
            placeholder='Enter your email' 
            value={signUp.email}
            onChange={handler}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type='password'
            name='password'
            placeholder='Enter your password' 
            value={signUp.password}
            onChange={handler}/>
        </div>
        <button type='submit'>SignUp</button>
        <span>Already have an account?</span>
        <Link to="/Login">Login</Link>
      </form>
    
    </div>
  );
}

export default SignUp;
