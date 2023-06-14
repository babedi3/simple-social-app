import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const data = {
    username: email,
    password: password,
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post('http://localhost:8000/api/token/', data);
    if (res.data) {
      localStorage.setItem('token', res.data.access);
      localStorage.setItem('user', email);
      navigate('/posts');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
