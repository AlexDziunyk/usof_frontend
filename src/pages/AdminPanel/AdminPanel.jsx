import './style.css';
import { NavLink, Outlet } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className='admin-panel'>
      <div className='admin-panel__content'>
        <h2 className='admin-panel__title'>Admin Panel</h2>
        <div className='admin-panel__navbar'>
          <NavLink className={({isActive}) => isActive ? "admin-panel__navlink-active" : 'admin-panel__navlink'} to="/admin/posts">All Posts</NavLink>
          <NavLink className={({isActive}) => isActive ? "admin-panel__navlink-active" : 'admin-panel__navlink'} to="/admin/comments">All Comments</NavLink>
          <NavLink className={({isActive}) => isActive ? "admin-panel__navlink-active" : 'admin-panel__navlink'} to="/admin/categories">All Categories</NavLink>
          <NavLink className={({isActive}) => isActive ? "admin-panel__navlink-active" : 'admin-panel__navlink'} to="/admin/users">All Users</NavLink>
        </div>
        <Outlet></Outlet> 
      </div>
    </div>
  )
}

export default AdminPanel;