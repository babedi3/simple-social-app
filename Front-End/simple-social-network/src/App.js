import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Post from './Post';
import Posts from './Posts'; // This is the new component to display a list of posts
import PostForm from './PostForm';
import { Link } from 'react-router-dom';

function App() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#282c34',
    padding: '1em 0',
    marginBottom: '2em',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2em',
  };
  return (
    <Router>
       <div>
       <nav style={navStyle}>
            <Link style={linkStyle} to="/signup">Sign Up</Link>
            <Link style={linkStyle} to="/login">Log In</Link>
            <Link style={linkStyle} to="/create">Create Post</Link>
            <Link style={linkStyle} to="/posts">View Posts</Link>
        </nav>

        <Routes>
        <Route path="/" element={<Signup />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<Post />} /> 
      </Routes>
      </div>

    </Router>
  );
}

export default App;
