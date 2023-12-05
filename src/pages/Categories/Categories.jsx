import Post from '../../components/Post/Post';
import { useState, useEffect } from 'react';
import axios from '../../axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/postsSlice';
import './style.css';
import Category from '../../components/Category/Category';
import { MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';

import { isAuthSelector } from "../../redux/slices/authSlice";
import ModalLogin from '../../components/ModalLogin/ModalLogin';

const Categories = () => {
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.posts);

  const isAuth = useSelector(isAuthSelector);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const isCategoriesLoading = categories.status === "loading";

  const handleModalOpen = () => {
    if(!isAuth) {
      setIsModalOpened(true);
    }
  }


  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      {isModalOpened && <ModalLogin isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened}/>}
      <div className='categories'>
        {isAuth ? 
          <Link onClick={handleModalOpen} to="/categories/createCategory" className='add-category'>
            <h4 className='add-category__title'><MdAdd size={50}/></h4>
            <p className='add-category__description'>Add new category</p>
          </Link>
        :
          <div onClick={handleModalOpen} to="/categories/createCategory" className='add-category'>
            <h4 className='add-category__title'><MdAdd size={50}/></h4>
            <p className='add-category__description'>Add new category</p>
          </div>}
        {!isCategoriesLoading ? 
        categories.items.map(item => <Category key={item.id} title={item.title} description={item.description}/>)
        :
        <></>}
      </div>
    </>
  )
}

export default Categories;