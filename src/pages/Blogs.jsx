import React, { useEffect, useState } from 'react'
import { BackButton } from '../components/BackButton'
import axios from 'axios';
import { Loading } from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import '../styles/blog.css'

export const Blogs = () => {
  const [blog,setBlog] = useState([]);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const handleCreate = () =>{
    navigate('/blogs/create');
  }

  const handleClick = (id) =>{
    const findBlog = blog.find((obj)=>{
      return obj.id === id;
    })
      navigate('/blogs/detail',{
        state:{
          output : findBlog
        }
    });
  }

  useEffect(()=>{
    const getBlog = async()=>{
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_URL}/blogs/all`);
        console.log(response.data);
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    }
    getBlog();
  },[])


  const cardBlog = blog.map((obj,ind)=>{
    return (
      <div key={obj.id} className='Blog_overview'>
        <p className='Blog_title'>{obj.title}</p>
        <p className='Blog_author'>{obj.author}</p>
        <p className='Blog_desc'>{obj.description}</p>
        <button onClick={() => handleClick(obj.id)} className='Blog_button'>Read in Detail</button>
      </div>
    )
  })

  return (
    <div className='Blog_Outer_Main'>
      <BackButton />
      {loading ? <Loading /> : (
        <div className="Blog_outer">
        <div className='Blog_Container'>
          <div className='Blog_heading'><h2>Nutrition Blogs</h2></div>
          <div className="Blog_Main_button"><button onClick={handleCreate}>Create Post</button></div>
          {cardBlog}
        </div>
        </div>
      )}
    </div>
  )
}
