import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../../axios/axios';
import Comment from "../Comment/Comment";

import './style.css';
import RatingBlock from "../RatingBlock/RatingBlock";
import UserPostCard from "../UserPostCard/UserPostCard";

import Divider from '@mui/material/Divider';

import { fetchAuthMe, isAuthSelector, roleSelector } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import ModalLogin from "../ModalLogin/ModalLogin";


const FullPost = () => {
  const {id} = useParams();
  const [postData, setPostData] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();
  const [avatar, setAvatar] = useState('');

  const isAuth = useSelector(isAuthSelector);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleModalOpen = () => {
    if(!isAuth) {
      setIsModalOpened(true);
      return true
    }
    return false;
  }

  useEffect(() => {
    const getPost = async() => {
      const {data} = await axios.get(`posts/getPost/${id}`);
      console.log(data)
      const json = data.post[0];
      const url = json.content;
      const blob = await fetch(url);
      const blobText = await blob.text();

      const {data: authorAvatar} =  await axios.get(`/posts/authorAvatar/${json.author}`);

      setAvatar(authorAvatar.avatar);

      setContent(blobText);
      setPostData(json);
      setCategories(json.categories.split(';'));
    }

    getPost();
  }, []);

  useEffect(() => {

    const getCommentsForPost = async() => {
      const {data} = await axios.get(`/comments/getComments/${id}`);
      console.log(data)
      const json = data.comments;
      setComments(json);
    }
    getCommentsForPost();
  }, [newComment]);

  useEffect(() => {
    const getAllLikesForPost = async() => {
      const {data} = await axios.get(`/likes/postLikes/${id}`);
      const json = data.likes;
      setLikes(json);
    }
    getAllLikesForPost();
  }, [isLiked])

  
  const addLike = async() => {
    if(handleModalOpen()) {
      return;
    }

    const dateNew = new Date();

    const {data} = await axios.post(`/likes/addLike`, {author: postData.author, date: dateNew.toString(), post_id: postData.id, type: "like"});
    console.log(data)
    const json = data.status;
    setIsLiked(json);
  }

  const addDislike = async() => {
    if(handleModalOpen()) {
      return;
    }

    const dateNew = new Date();

    const {data} = await axios.post(`/likes/addDislike`, {author: postData.author, date: dateNew.toString(), post_id: postData.id, type: "dislike"});
    const json = data.status;
    setIsLiked(json);
  }

  const [commentContent, setCommentContent] = useState('');

  const createComment = async() => {
    if(handleModalOpen()) {
      return;
    }
    
    const dateNew = new Date();

    const {data} = await axios.post('/comments/createComment', { date: dateNew.toString(), content: commentContent, post_id: id});
    setNewComment(data);
    setCommentContent('');
  }

  

  return (
    <>
      {isModalOpened && <ModalLogin setIsModalOpened={setIsModalOpened}/>}
      <div className="fullpost">
        {postData ? 
          <div className="fullpost__container">
            <UserPostCard avatar={avatar} status={postData.status} author={postData.author} date={postData.date}/>
            <div className="fullpost__info">
              <h1>{postData.title}</h1>
              <RatingBlock likes={likes} isLiked={isLiked} addLike={addLike} addDislike={addDislike}/>
            </div>
            <div className="fullpost__categories">{categories.map(category => <div key={category} className="fullpost__categories_item">{category}</div>)}</div>
            <div className="fullpost__content" dangerouslySetInnerHTML={{ __html: content }}></div>
            <Divider>COMMENTS</Divider>
            <div className="fullpost__comments">
              <div className="fullpost__create-comment">
                <p className="fullpost__create-comment-title">Add your comment</p>
                <TextField
                  id="outlined-required"
                  label="Write your opinion!"
                  value={commentContent}
                  sx={{width: '100%'}}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <button onClick={createComment} className="fullpost__create-comment-button">Create comment</button>
              </div>
              {comments.length > 0 ? comments.map(comment => <Comment key={comment.id} comment_id={comment.id} author={comment.author} content={comment.content} date={comment.date}/>)
              :
              <p className="fullpost__no-comments">No comments yet ;(</p>}
            </div>
          </div>
          : 
          <p>Loading</p>}
      </div>
    </>
  )
}

export default FullPost;