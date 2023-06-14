import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/posts/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPosts(res.data);
    } catch (error) {
      if (error.response.status === 401) { // if the error is an Unauthorized error
        setError('You must be logged in to view posts.');
      } else {
        setError('An error occurred while trying to fetch posts.');
      }
    }
  };

  const handleLike = async (postId) => {
    await axios.post(`http://localhost:8000/api/posts/${postId}/like/`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    fetchPosts();  // Refresh posts after liking
  }

  const handleUnlike = async (postId) => {
    await axios.post(`http://localhost:8000/api/posts/${postId}/unlike/`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    fetchPosts();  // Refresh posts after unliking
  }

  useEffect(() => {
    fetchPosts();
  }, []);
console.log(error)
  if (error != '') {  
    return <div>Please authenticate before attempting to view posts</div>;
  }
  console.log(posts)

  if (posts === null) {
    return <div>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          {/* <Link to={`/posts/${post.id}`}> */}
            <h2>{post.content.substring(0, 50)}...</h2>
          {/* </Link> */}
          {/* <p>{post.likes} likes</p> */}
          <p>{post.likes.length} like{post.likes.length===0 ||post.likes.length>1 ?"s" : ""}</p>
          <button onClick={() => handleLike(post.id)}>Like</button> {/* Like button */}
          <button onClick={() => handleUnlike(post.id)}>Unlike</button> {/* Unlike button */}
        </div>
      ))}
    </div>
  );
};

export default Posts;
