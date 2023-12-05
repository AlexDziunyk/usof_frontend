import './style.css';

import {useState} from 'react';
import TextField from '@mui/material/TextField';

import axios from '../../axios/axios';
import {useNavigate} from 'react-router-dom';

const CreateCategory = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError]= useState("");
  const navigate = useNavigate();

  const handleSaveCategory = async() => {
    if(!title && !description) {
      setError("All fields must be filled!");
      return;
    }
    const {data} = await axios.post("/categories/createCategory", {title, description});
    if(data.status === "success") {
      navigate('/categories');
    } else {
      setError(data.error);
    }
  }

  return (
    <div className='create-category'>
      <h2>Create an interesting category!</h2>
      <div className='create-category__title'>
        <h4>Title</h4>
        <p>Name it cool!</p>
        <TextField required value={title} onChange={(e) => setTitle(e.target.value)} id="outlined-basic" label="Title" variant="outlined" />
      </div>
      <div className='create-category__description'>
        <h4>Description</h4>
        <p>Describe it in details</p>
        <TextField required value={description} onChange={(e) => setDescription(e.target.value)} id="outlined-multiline-flexible" multiline label="Description" variant="outlined" /> 
      </div> 
      <button onClick={handleSaveCategory} className='navbar__button'>Create category</button>
      <div className='error'>{error}</div>
    </div>
  )
}

export default CreateCategory