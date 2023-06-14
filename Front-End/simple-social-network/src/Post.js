// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Post = ({ match }) => {
//     const [post, setPost] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/post/${match.params.id}/`, {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//                 });
//                 setPost(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError('Failed to load post.');
//                 setLoading(false);
//             }
//         };

//         fetchPost();
//     }, [match.params.id]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;
//     if (!post) return <p>No post found.</p>;

//     return (
//         <div>
//             <h2>{post.title}</h2>
//             <p>{post.content}</p>
//             <p>Likes: {post.likes}</p>
//         </div>
//     );
// }

// export default Post;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Post = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`http://localhost:8000/api/posts/${id}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPost(res.data);
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <p>Likes: {post.likes}</p>
    </div>
  );
};

export default Post;
