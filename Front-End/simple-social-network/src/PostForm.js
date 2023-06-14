import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const data = {"content":text}
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
console.log(data)
    const res = await axios.post('http://localhost:8000/api/posts/', data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data) {
      navigate('/posts');
    }
} catch (error) {
  console.log(error.response.data);

    // error handling here
    if (error.response && error.response.status === 401) {
      alert('You are not authenticated. Please log in to create a post.');
    } else {
      setErrorMessage('Something went wrong. Please try again later.');
    }
  }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Create Post</h1>
      <textarea 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="What's on your mind?"
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
