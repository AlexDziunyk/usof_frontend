import { AiOutlineSearch } from 'react-icons/ai';
import Category from '../Category/Category';
import './style.css';
import { useState, useEffect } from 'react';

const SearchBlock = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async() => {
      const data = await fetch('http://localhost:3001/api/categories/allCategories');
      const json = await data.json();
      setCategories(json.categories);
      console.log(json);
    };
    getCategories();
  }, [])

  return (
    <div className='search-block'>
      <div className='search-block__input'>
        <input placeholder='Search'></input>
        <AiOutlineSearch className='search-block__icon' size={20}/>
      </div>
      <div className='search-block__categories'>
        <p className='search-block__categories-title'>Fresh Categories</p>
        {categories && categories.map(({id, title, description}) => <Category key={id} title={title} description={description}/>)}
      </div>
    </div>
  )
}

export default SearchBlock;