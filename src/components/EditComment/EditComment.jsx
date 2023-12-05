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

import TextField from '@mui/material/TextField';


const timeAgo = new TimeAgo('en-US')

const EditComment = ({setUpdatePage, comment_id, author, content, date}) => {

  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState(0);

  const isAuth = useSelector(isAuthSelector);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const getUserData = async() => {
      const {data} = await axios.get('/auth/me');
      setAvatar(data.avatar);
    }
    getUserData();
  }, [])


  const handleModalOpen = () => {
    if(!isAuth) {
      setIsModalOpened(true);
      return true
    }
    return false;
  }

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
  

  const [isEdit, setIsEdit] = useState(false);
  const [commentContent, setCommentContent] = useState(content);

  const editMyComment = () => {
    setIsEdit(true);
  }

  const cancelEditing = () => {
    setIsEdit(false);
    setCommentContent(content);
  }

  const saveEditing = async() => {
    const dateNew = new Date();
    console.log("SDSDD")
    const {data} = await axios.patch(`/comments/update/${comment_id}`, {content: commentContent, date: dateNew.toString()});
    
    setIsEdit(false);
  }

  const deleteMyComment = async() => {
    const {data} = await axios.delete(`/comments/delete/${comment_id}`);
    setUpdatePage(data);
  }


  return (
    <>
      {isModalOpened && <ModalLogin setIsModalOpened={setIsModalOpened}/>}
      <div className='edit-comment'>
        <div className='edit__comment-upper-row'>
          <div className='comment__user'>
            <div className='comment__avatar'>
              <img src={avatar} alt=''></img>
            </div>
            <p className='comment__login'>{author}</p>
            <p className='comment__date'>{timeAgo.format(Date.parse(date))}</p>
          </div>
          <div className="edit-comment__icons">
            <div onClick={editMyComment} className="edit-comment__edit">
              <MdOutlineEdit size={25}/>
            </div>
            <div onClick={deleteMyComment} className="edit-comment__delete">
              <MdOutlineDelete size={25}/>
            </div>
          </div>
        </div>
          <TextField
            required
            id="outlined-multiline-flexible"
            label="Content"
            multiline
            disabled={!isEdit}
            fullWidth
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <div className='edit-comment-buttons'>
            <RatingBlock likes={likes} isLiked={isLiked} addLike={addLike} addDislike={addDislike}/>
            {isEdit && <button onClick={saveEditing} className='edit-comment__save'>Save</button>}
            {isEdit && <button onClick={cancelEditing} className='edit-comment__cancel'>Cancel</button>}
          </div>
      </div>
    </>
  )
}

export default EditComment;