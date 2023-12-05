import './style.css';
import {useState, useEffect} from 'react';
import axios from '../../axios/axios';
import AdminComment from '../../components/AdminComment/AdminComment';

const AdminComments = () => {

  const [allComments, setAllComments] = useState([]);
  const [updatePage, setUpdatePage] = useState(null);

  useEffect(() => {
    const getAllMyComments = async() => {
      const {data} = await axios.get('/admin/comments');
      setAllComments(data.allComments);
    }
    getAllMyComments();
  }, [updatePage])

  return (
    <div className='admin-comments'>
      {allComments ? allComments.map(({id, author, content, date}) => 
        <AdminComment setUpdatePage={setUpdatePage} key={id} comment_id={id} author={author} date={date} content={content}/>
      )
      :
      <p>Loading</p>}
      {allComments && allComments.length === 0 && <p>No comments ;(</p>}
    </div>
  )
}

export default AdminComments