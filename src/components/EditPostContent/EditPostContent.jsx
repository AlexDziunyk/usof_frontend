import { useEffect, useState } from 'react';
import './style.css';
import axios from '../../axios/axios';

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import {useNavigate, useParams} from "react-router-dom";
import Switch from '@mui/material/Switch';

import TextEditor from '../TextEditor/TextEditor';

import {app} from '../../firebase/app'; 
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

import { fetchAuthMe, isAuthSelector, roleSelector } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';


const EditPostContent = () => {

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  const handleChangeTitle = async(e) => {
    setTitle(e.target.value);
  }

  const storage = getStorage(app);

  const handleSavePost = async(e) => {
    e.preventDefault();
    if(!title || chipCategory.length === 0) {
      setError("All fields must be filled!");
      return;
    }

    const status = checked.includes('active') ? 'active' : 'inactive';
    console.log(status)

    const blob = new Blob([content], {type: "text/html"});
    const postId = uuidv4();
    const postRef = ref(storage, `Posts/${postId}`);
    console.log("checked!", checked)
    uploadBytes(postRef, blob).then(snapshot => {
      console.log("File uploaded!");
      getDownloadURL(postRef).then(async(url) => {
        const dateNew = new Date();
        const blobUrl = await axios.patch(`/posts/updatePost/${id}`, {title, status: status, content: url, categories: chipCategory.join(' '), date: dateNew.toString()});
        if(userData) {
          userData.role === "user" ? navigate('/profile/myposts') : navigate('/admin/posts');  
        } 
      })
    });

    // const updatedPost = await axios.patch(`/posts/updatePost/${id}`, {title, status, categories: chipCategory.join(' '), date: dateNew.toString()});
    // navigate('/profile/myposts');  
    
  }

  const handleCancelEdit = () => {
    if(userData) {
      userData.role === "user" ? navigate('/profile/myposts') : navigate('/admin/posts');  
    } 
  }


  const [chipCategory, setChipCategory] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setChipCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async() => {
      const {data} = await axios('/categories');
      console.log(data);
      setCategories(data.categories);
    }
    getCategories();
  }, []);

  const [postData, setPostData] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const getPostData = async() => {
      const {data} = await axios.get(`posts/getPost/${id}`);
      setPostData(data.post[0]);
      setTitle(data.post[0].title);
      setChipCategory(data.post[0].categories.split(' '));
      setChecked([data.post[0].status]);
      
    }
    getPostData();
  }, [])


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  const [content, setContent] = useState('');

  const userData = useSelector(roleSelector);

  return (
    <div className='create-post__container'>
      <h2>Ask an interesting question!</h2>
      
      <div className='create-post__swticher'>
        <Switch
          edge="end"
          onChange={handleToggle('active')}
          checked={checked.indexOf('active') !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-wifi',
          }}
        />
      </div>
      <div className='create-post__title'>
        <h4>Title</h4>
        <p>Be specific and imagine you’re asking a question to another person.</p>
        <input required value={title} onChange={handleChangeTitle} className="create-post__title-input" placeholder='e.g. How to create a form? HTML'></input>
      </div>
      {userData.role === 'user' && <div className='create-post__details'>
        <h4>Details</h4>
        <p>Be specific and imagine you’re asking a question to another person.</p>
        <TextEditor content={content} setContent={setContent}/>
      </div>}
      <div className='create-post__categories'>
      <InputLabel  id="demo-multiple-chip-label">Categories</InputLabel>
      <p>Add at least one category that is connected to your question.</p>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={chipCategory}
          onChange={handleChange}
          input={<OutlinedInput  id="select-multiple-chip"  />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.title}
              value={category.title}
            >
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className='edit-post__buttons'>
        <button type='submit' onClick={handleSavePost} className='edit-post_save'>Save</button>
        <button className='edit-post_cancel' onClick={handleCancelEdit}>Cancel</button>
      </div>
      <div className='error'>{error}</div>
    </div>
  );

}

export default EditPostContent;