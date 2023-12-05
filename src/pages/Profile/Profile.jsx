import { NavLink, Outlet } from 'react-router-dom';
import './style.css';
import { useEffect } from 'react';

const Profile = () => {

  return (
    <div className='profile'>
      <div className='profile__content'>
        <h2 className='profile__title'>My Profile</h2>
        <div className='profile__navbar'>
          <NavLink className={({isActive}) => isActive ? "profile__navlink-active" : 'profile__navlink'} to="/profile/me">Me</NavLink>
          <NavLink className={({isActive}) => isActive ? "profile__navlink-active" : 'profile__navlink'} to="/profile/myposts">My Posts</NavLink>
          <NavLink className={({isActive}) => isActive ? "profile__navlink-active" : 'profile__navlink'} to="/profile/mycomments">My Comments</NavLink>
          <NavLink className={({isActive}) => isActive ? "profile__navlink-active" : 'profile__navlink'} to="/profile/mycategories">My Categories</NavLink>
        </div>
        <Outlet></Outlet> 
      </div>
    </div>
  )
}

export default Profile;