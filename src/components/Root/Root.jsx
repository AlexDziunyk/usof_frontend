import { Link, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './style.css'
import SearchBlock from '../SearchBlock/SearchBlock';
import { useEffect } from 'react';

const Root = () => {

  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate('/profile/me');
  // }, [])

  return (
    <div className='root-container'>

      <Navbar></Navbar>
      <main>
        <Outlet />
      </main>
      
      
      {/* <SearchBlock /> */}
    </div>
  )
}

export default Root;