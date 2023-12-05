import './style.css';
import axios from '../../axios/axios';
import {useState, useEffect} from 'react';
import EditComment from '../../components/EditComment/EditComment';

const MyComments = () => {

  const [myComments, setMyComments] = useState([]);
  const [updatePage, setUpdatePage] = useState(null);

  useEffect(() => {
    const getMyComments = async() => {
      const {data} = await axios.get('/user/myComments');
      console.log(data);
      setMyComments(data.myComments);
    }
    getMyComments();
  }, [updatePage])

  return (
    <div className='my-comments'>
      {myComments ? myComments.map(({id, author, content, date}) => 
        <EditComment setUpdatePage={setUpdatePage} key={id} comment_id={id} author={author} date={date} content={content}/>
      )
      :
      <p>Loading</p>}
      {myComments && myComments.length === 0 && <p>You have no comments ;(</p>}
    </div>
  )
}

export default MyComments;