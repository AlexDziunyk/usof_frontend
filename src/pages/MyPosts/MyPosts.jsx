import './style.css';
import axios from '../../axios/axios';
import {useState, useEffect} from 'react';
import EditPost from '../../components/EditPost/EditPost';

const MyPosts = () => {

  const [myPosts, setMyPosts] = useState([]);
  const [updatePage, setUpdatePage] = useState(null);


  useEffect(() => {
    const getMyPosts = async() => {
      const {data} = await axios.get('/user/myPosts');
      setMyPosts(data.myPosts);
    }
    getMyPosts();
  }, [updatePage])

  return (
    <div className='my-posts'>
      {myPosts ? myPosts.map(({id, author, title, status, date}) => 
        <EditPost setUpdatePage={setUpdatePage} key={id} id={id} author={author} title={title} status={status} date={date}/>
      )
      :
      <p>Loading</p>}
      {myPosts && myPosts.length === 0 && <p>You have no posts ;(</p>}
    </div>
  )
}

export default MyPosts;