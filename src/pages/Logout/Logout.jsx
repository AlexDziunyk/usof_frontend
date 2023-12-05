import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import './style.css';
import { logout } from '../../redux/slices/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  }

  return (
    <div onClick={handleLogoutClick} className="loout__container"><Link className='logout-button' to="/">Logout</Link></div>
  )
}

export default Logout;