import './style.css';

import {useState} from 'react';
import TextField from '@mui/material/TextField';

import axios from '../../axios/axios';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';

const EditCategoryContent = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError]= useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  const handleSaveCategory = async() => {
    if(!title && !description) {
      setError("All fields must be filled!");
      return;
    }
    const {data} = await axios.patch(`/categories/update/${id}`, {title, description});
    if(data.status === "success") {
      navigate('/categories');
    } else {
      setError(data.error);
    }
  }

  const handleCancelEdit = async() => {
    navigate('/categories');
  }

  return (
    <div className='edit-content-category-content'>
      <div className='edit-content-category__title'>
        <h4>Title</h4>
        <p>Name it cool!</p>
        <TextField required value={title} onChange={(e) => setTitle(e.target.value)} id="outlined-basic" label="Title" variant="outlined" />
      </div>
      <div className='edit-content-category__description'>
        <h4>Description</h4>
        <p>Describe it in details</p>
        <TextField required value={description} onChange={(e) => setDescription(e.target.value)} id="outlined-multiline-flexible" multiline label="Description" variant="outlined" /> 
      </div> 
      <div className='edit-post__buttons'>
        <button type='submit' onClick={handleSaveCategory} className='edit-post_save'>Save</button>
        <button className='edit-post_cancel' onClick={handleCancelEdit}>Cancel</button>
      </div>
      <div className='error'>{error}</div>
    </div>
  )
}

export default EditCategoryContent;