import { useEffect, useState } from 'react';
import './style.css';
import axios  from '../../axios/axios';
import AdminPost from '../../components/AdminPost/AdminPost';
import EditPost from '../../components/EditPost/EditPost';

const AdminPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [updatePage, setUpdatePage] = useState(null);

  useEffect(() => {
    const getAllPosts = async() => {
      const {data} = await axios.get('/admin/posts');
      setAllPosts(data.allPosts);
    }
    getAllPosts();
  }, [updatePage])

  return (
    <div className='all-posts'>
      {allPosts ? allPosts.map(({id, author, title, status, date}) => 
        <EditPost setUpdatePage={setUpdatePage} key={id} id={id} author={author} title={title} status={status} date={date}/>
      )
      :
      <p>Loading</p>}
      {allPosts && allPosts.length === 0 && <p>No posts ;(</p>}
    </div>
  )
}

export default AdminPosts;