import { useEffect, useState } from 'react';
import './style.css';
import TextEditor from '../../components/TextEditor/TextEditor';
import {app} from '../../firebase/app'; 
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import axios from '../../axios/axios';

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import {useNavigate} from "react-router-dom";

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeTitle = async(e) => {
    setTitle(e.target.value);
  }

  const storage = getStorage(app);

  const handleSavePost = async(e) => {
    e.preventDefault();
    if(!title || !content || chipCategory.length === 0) {
      setError("All fields must be filled!");
      return;
    }
    const blob = new Blob([content], {type: "text/html"});

    const id = uuidv4();
    const postRef = ref(storage, `Posts/${id}`);

    uploadBytes(postRef, blob).then(snapshot => {
      console.log("File uploaded!");
      getDownloadURL(postRef).then(async(url) => {
        const dateNew = new Date();
        const blobUrl = await axios.post('/posts/createPost', {title, status: "active", content: url, categories: chipCategory.join(';'), date: dateNew.toString()});
        navigate('/posts');
      })
    });
  }

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


  return (
    <form className='create-post__container'>
      <h2>Ask an interesting question!</h2>
      <div className='create-post__title'>
        <h4>Title</h4>
        <p>Be specific and imagine you’re asking a question to another person.</p>
        <input required value={title} onChange={handleChangeTitle} className="create-post__title-input" placeholder='e.g. How to create a form? HTML'></input>
      </div>
      <div className='create-post__details'>
        <h4>Details</h4>
        <p>Be specific and imagine you’re asking a question to another person.</p>
        <TextEditor content={content} setContent={setContent}/>
      </div>
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
      <button type='submit' onClick={handleSavePost} className='navbar__button'>Send</button>
      <div className='error'>{error}</div>
    </form>
  );

}

export default CreatePost