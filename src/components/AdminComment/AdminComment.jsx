import './style.css';

import { useState, useEffect } from 'react';
import axios from '../../axios/axios';

import './style.css';
import RatingBlock from '../RatingBlock/RatingBlock';
import ModalLogin from '../ModalLogin/ModalLogin';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en';

import { fetchAuthMe, isAuthSelector, roleSelector } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';

import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";


const timeAgo = new TimeAgo('en-US')


const AdminComment = ({setUpdatePage, comment_id, author, date, content}) => {

  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState(0);


  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const getUserData = async() => {
      const {data} = await axios.get(`comments/authorAvatar/${author}`);
      setAvatar(data.avatar);
    }
    getUserData();
  }, [])

  useEffect(() => {
    const getAllLikesForComment = async() => {
      const {data} = await axios.get(`/likes/commentLikes/${comment_id}`);
      const json = data.likes;
      setLikes(json);
    }
    getAllLikesForComment();
  }, [isLiked])
  

  const addLike = async() => {

    const dateNew = new Date();

    const {data} = await axios.post(`/likes/addLike`, {author, date: dateNew.toString(), comment_id, type: "like"});
    const json = data.status;
    setIsLiked(json);
  }

  const addDislike = async() => {
    const dateNew = new Date();

    const {data} = await axios.post(`/likes/addDislike`,  {author, date: dateNew.toString(), comment_id, type: "dislike"});
    const json = data.status;
    setIsLiked(json);
  }
  

  const deleteComment = async() => {
    const {data} = await axios.delete(`/comments/delete/${comment_id}`);
    setUpdatePage(data);
  }


  return (
    <div className='admin-comment'>
        <div className='admin-upper-row'>
          <div className='admin-comment__user'>
            <div className='comment__avatar'>
              <img src={avatar} alt=''></img>
            </div>
            <p className='comment__login'>{author}</p>
            <p className='comment__date'>{timeAgo.format(Date.parse(date))}</p>
          </div>
          <div className="admin-comment__icons">
            <div onClick={deleteComment} className="edit-comment__delete">
              <MdOutlineDelete size={25}/>
            </div>
            </div>
        </div>
        <p className='comment__content'>{content}</p>
        <div className='admin-comment-buttons'>
          <RatingBlock likes={likes} isLiked={isLiked} addLike={addLike} addDislike={addDislike}/>
        </div>
      </div>
  )
}

export default AdminComment