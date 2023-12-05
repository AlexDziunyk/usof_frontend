import { Link } from "react-router-dom";
import './style.css'
import { useState, useEffect } from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import axios from "../../axios/axios";

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';


import { MdOutlineDelete } from "react-icons/md";



TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US')

const AdminPost = ({id, author, title, status, date, setUpdatePage}) => {

  const [likes, setLikes] = useState(0);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const getAllLikesForPost = async() => {
      const {data} = await axios.get(`/likes/postLikes/${id}`);
      setLikes(data.likes);
    }

    const getAuthorAvatar = async() => {
      const {data} = await axios.get(`/posts/authorAvatar/${author}`);
      setAvatar(data.avatar)
    }

    getAuthorAvatar();

    getAllLikesForPost();
  }, []);


  const deleteMyPost = async() => {
    const {data} = await axios.delete(`/posts/delete/${id}`);
    setUpdatePage(data);
  }


  return (
    <div className="edit-post">
      <div className="edit-post__row">
        <div className="edit-post__avatar">
          <img src={avatar} alt="" className="post__avatar-img"></img>
        </div>
        <div className="edit-post__content">
          <div className="edit-post__status">
            <p className="edit-post__author">{author}</p>
            <p className={`${status}`}>{status}</p>
          </div>
          <Link className="edit-post__title" to={`/posts/${id}`}>{title}</Link>
          <div className="edit-post__numbers">
            <div className="edit-post__like">
              <AiOutlineHeart />
              <p>{likes}</p>
            </div>
            <p className="edit-post__date">Published: {timeAgo.format(Date.parse(date))}</p>
          </div>
        </div>
      </div>
      <div className="edit-post__icons">
        <div onClick={deleteMyPost} className="edit-post__delete">
          <MdOutlineDelete size={25}/>
        </div>
      </div>
    </div>
  )
}

export default AdminPost