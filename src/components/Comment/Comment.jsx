import { useState, useEffect } from 'react';
import axios from '../../axios/axios';

import './style.css';
import RatingBlock from '../RatingBlock/RatingBlock';
import ModalLogin from '../ModalLogin/ModalLogin';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en';

import { fetchAuthMe, isAuthSelector, roleSelector } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';

import { FaReply } from "react-icons/fa";

import TextField from '@mui/material/TextField';

const timeAgo = new TimeAgo('en-US')

const Comment = ({comment_id, author, content, date}) => {

  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState(0);

  const isAuth = useSelector(isAuthSelector);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleModalOpen = () => {
    if(!isAuth) {
      setIsModalOpened(true);
      return true
    }
    return false;
  }

  const [isReply, setIsReply] = useState(false);

  useEffect(() => {
    const getAllLikesForComment = async() => {
      const {data} = await axios.get(`/likes/commentLikes/${comment_id}`);
      const json = data.likes;
      setLikes(json);
    }
    getAllLikesForComment();
  }, [isLiked])
  
  const addLike = async() => {
    if(handleModalOpen()) {
      return;
    }

    const dateNew = new Date();

    const {data} = await axios.post(`/likes/addLike`, {author, date: dateNew.toString(), comment_id, type: "like"});
    const json = data.status;
    setIsLiked(json);
  }

  const addDislike = async() => {
    if(handleModalOpen()) {
      return;
    }
    
    const dateNew = new Date();

    const {data} = await axios.post(`/likes/addDislike`,  {author, date: dateNew.toString(), comment_id, type: "dislike"});
    const json = data.status;
    setIsLiked(json);
  }

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const getUserData = async() => {
      const {data} = await axios.get(`/comments/authorAvatar/${author}`);
      setAvatar(data.avatar);
    }
    getUserData();
  }, [])

  
  const [replyContent, setReplyContent] = useState('');
  const [newReply, setNewReply] = useState('');
  const [allReplies, setAllReplies] = useState();

  const createReply = async() => {
    if(handleModalOpen()) {
      return;
    }
    
    const dateNew = new Date();

    const {data} = await axios.post('/comments/createReply', { date: dateNew.toString(), content: replyContent, reply_id: comment_id});
    setNewReply(data);
    setReplyContent('');
    setIsReply(false)
  }

  useEffect(() => {
    const getAllReplies = async() => {
      const {data} = await axios.get(`/comments/getReplies/${comment_id}`);
      setAllReplies(data.replies); 
      
    
      console.log("replies", data.replies);
    }
    getAllReplies();
  }, [newReply]);


  return (
    <>
      {isModalOpened && <ModalLogin setIsModalOpened={setIsModalOpened}/>}
      <div className='comment'>
        <div className='comment__user'>
          <div className='comment__avatar'>
            <img src={avatar} alt=''></img>
          </div>
          <p className='comment__login'>{author}</p>
          <p className='comment__date'>{timeAgo.format(Date.parse(date))}</p>
        </div>
        <p className='comment__content'>{content}</p>
        <div className='comment__lowrow'>
          <RatingBlock likes={likes} isLiked={isLiked} addLike={addLike} addDislike={addDislike}/>
          <div onClick={() => setIsReply(prev => !prev)} className='comment__reply'>
            <FaReply size={25}/>
          </div>
        </div>

        {isReply && <div className="fullpost__create-comment">
          <p className="fullpost__create-comment-title">Add your reply</p>
          <TextField
            id="outlined-required"
            label="Tell this boy what you think about him!"
            value={replyContent}
            sx={{width: '100%'}}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button onClick={createReply} className="fullpost__create-comment-button">Reply</button>
        </div>}
        {allReplies && allReplies.map(reply => 
          ( 
          <div className='comment'>
            <div className='comment__user'>
              <p className='comment__login'>{reply.author}</p>
              <p className='comment__date'>{timeAgo.format(Date.parse(reply.date))}</p>
            </div>
            <p className='comment__content'>{reply.content}</p>
          </div>
          )
        )}
      </div>
      
    </>
  )
}

export default Comment;