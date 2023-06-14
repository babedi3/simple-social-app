import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   if (password === password2) {
  //     const res = await axios.post('http://localhost:8000/api/social/signup/', { email, password });
  //     if (res.data) {
  //       navigate('/login');
  //     }
  //   } else {
  //     alert('Passwords do not match');
  //   }
  // };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (password === password2) {
      try {
        console.log({ email, password })
        const res = await axios.post('http://localhost:8000/api/social/signup/', { email, password });
        if (res.data) {
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data.detail) {
          alert(error.response.data.detail);
        } else if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(`Error: ${error.response.data}`);
        } else if (error.request) {
          console.log(error.request);
          alert('Error: The request was made but no response was received');
        } else {
          console.log('Error', error.message);
          alert(`Error: ${error.message}`);
        }
      }
    } else {
      alert('Passwords do not match');
    }
  };
  
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        placeholder="Password"
      />
      <input 
        type="password" 
        value={password2} 
        onChange={e => setPassword2(e.target.value)} 
        placeholder="Confirm Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
