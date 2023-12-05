import Post from '../../components/Post/Post';
import { useState, useEffect } from 'react';
import axios from '../../axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/postsSlice';
import './style.css';
import { fetchCategories } from '../../redux/slices/postsSlice';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';



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


const Posts = () => {

  const dispatch = useDispatch()
  const [filteredPosts, setFilteredPosts] = useState([]);

  const {categories} = useSelector(state => state.posts);

  const [sortingValue, setSortingValue] = useState("date");

  const handleSortingChange = (e) => {
    setSortingValue(e.target.value);
  }

  const isCategoriesLoading = categories.status === "loading";


  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const getAllLikesForPost = async(postId) => {
      const {data} = await axios.get(`/likes/postLikes/${postId}`);
      return data.likes;
    }

    const getPostsWithLikes = async(postsArr) => {
      console.log("1332")
      const dataPosts = postsArr.map(async (post) => {
        const likesForPost = await getAllLikesForPost(post.id);
        console.log("12")
        return {...post, likes: likesForPost};
      })
      const postsWithLikes = Promise.all(dataPosts);
      return postsWithLikes;
    } 

    const getPosts = async() => {
      const {data} = await axios.get('/posts/');
      console.log("sdsdsd", [...data.posts])

      const postsWithLikes = await getPostsWithLikes(data.posts);
      
      console.log("likss", postsWithLikes);
      if(sortingValue === "date") {
        postsWithLikes.sort((a,b) => new Date(b.date) - new Date(a.date));
      } else if(sortingValue === "likes") {
        postsWithLikes.sort((a, b) => b.likes - a.likes);
      }

    
      if(selectedCategories.length === 0) {
        setFilteredPosts(postsWithLikes);
      } else {
          const filteredData = postsWithLikes.filter(post => {
            const categoriesArray = post.categories.split(' ');
            if(categoriesArray.some(el => selectedCategories.includes(el))) {
              return post;
          }
        })
        // const sortedData = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
        // console.log("sort", sortedData)
        setFilteredPosts(filteredData);
      }
    } 
    getPosts();

  }, [selectedCategories, sortingValue]);


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  
  return (
    <div className='posts'>
      <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selectedCategories}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {!isCategoriesLoading && categories.items.map((category) => (
          <MenuItem key={category.title} value={category.title}>
            <Checkbox checked={selectedCategories.indexOf(category.title) > -1} />
            <ListItemText primary={category.title} />
          </MenuItem>
        ))}
      </Select>

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Sorting type</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={sortingValue}
          onChange={handleSortingChange}
        >
          <FormControlLabel value="date" control={<Radio />} label="Date" />
          <FormControlLabel value="likes" control={<Radio />} label="Likes" />
        </RadioGroup>
      </FormControl>
      
      {filteredPosts.length > 0 ? filteredPosts.map(item => <Post key={item.id} id={item.id} author={item.author} title={item.title} status={item.status} content={item.content} date={item.date}/>)
      :
      <p>Loading...</p>  
      }
      {filteredPosts && filteredPosts.length === 0 && <p>No posts yet ;(</p>}
    </div>
  )
}

export default Posts;