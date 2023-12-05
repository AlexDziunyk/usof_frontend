import { NavLink, Link } from "react-router-dom";
import './style.css';
import { BsFileTextFill } from 'react-icons/bs';
import { TbCategoryFilled } from 'react-icons/tb';
import { BsFillPersonFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import Logout from "../../pages/Logout/Logout";
import { isAuthSelector, roleSelector, fetchAuthMe } from "../../redux/slices/authSlice";

import ModalLogin from "../ModalLogin/ModalLogin";
import { useState, useEffect } from "react";

import { RiAdminFill } from "react-icons/ri";

const Navbar = () => {
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(roleSelector);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const dispatch = useDispatch();

  const handleModalOpen = () => {
    if(!isAuth) {
      setIsModalOpened(true);
    }
  }

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [isModalOpened]);

  return (
    <>
    {isModalOpened && <ModalLogin isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened}/>}
      <header>
          <ul className='navbar'>
           {isAuth && <NavLink className={({isActive}) => isActive ? "navlink active-link" : 'navlink'} to="/profile/me">
              <div className="navlink__path">
                <img className="navlink__avatar" src={userData ? userData.avatar : ""}></img>
              </div>
            </NavLink>}
            <NavLink className={({isActive}) => isActive ? "navlink active-link" : 'navlink'} to="/posts">
              <div className="navlink__path">
                <BsFileTextFill />
                <p className="navlink__text">Posts</p>
              </div>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "navlink active-link" : 'navlink'} to="/categories">
              <div className="navlink__path">
                <TbCategoryFilled />
                <p className="navlink__text">Categories</p>
              </div>
            </NavLink>
            {isAuth && userData.role === "admin" && <NavLink className={({isActive}) => isActive ? "navlink active-link" : 'navlink'} to="/admin/posts">
              <div className="navlink__path">
                <RiAdminFill />
                <p className="navlink__text">Admin Panel</p>
              </div>
            </NavLink>}
            {isAuth ? <Link onClick={handleModalOpen} to="/posts/createPost" className="navbar__button">Ask</Link> : <button className="navbar__button" onClick={() => setIsModalOpened(true)}>Ask</button>}
            {!isAuth && <button className="navbar__login" onClick={() => setIsModalOpened(true)}>Sign In</button>}
            {isAuth && <Logout />}
          </ul>
        
      </header>
    </>
  )
}

export default Navbar;