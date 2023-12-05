import { Link } from "react-router-dom";
import './style.css'
import { useState, useEffect } from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import axios from "../../axios/axios";

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import { useDispatch, useSelector } from 'react-redux';
import { roleSelector } from "../../redux/slices/authSlice";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US')

const Post = ({id, author, title, status, content, date}) => {

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

  return (
    <div className="post">
      <div className="post__avatar"><img src={avatar} alt="" className="post__avatar-img"></img></div>
      <div className="post__content">
        <div className="post__status">
          <p className="post__author">{author}</p>
          <p className={`${status}`}>{status}</p>
        </div>
        <Link className="post__title" to={`/posts/${id}`}>{title}</Link>
        <div className="post__numbers">
          <div className="post__like">
            <AiOutlineHeart />
            <p>{likes}</p>
          </div>
          <p className="post__date">Published: {timeAgo.format(Date.parse(date))}</p>
        </div>
      </div>
    </div>
  )
}

export default Post;