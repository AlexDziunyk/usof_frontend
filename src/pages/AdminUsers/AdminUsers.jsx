import './style.css';
import AdminUser from '../../components/AdminUser/AdminUser';
import {useState, useEffect} from 'react';
import axios from '../../axios/axios';

const AdminUsers = () => {

  const [allUsers, setAllUsers] = useState([]);
  const [updatePage, setUpdatePage] = useState(null);

  useEffect(() => {
    const getAllUsers = async() => {
      const {data} = await axios.get('/admin/users');
      setAllUsers(data.allUsers);
    }
    getAllUsers();
  }, [updatePage])

  return (
    <div className='admin-users'>
      {allUsers ? allUsers.map(({id, login, fullName, avatar}) => 
        <AdminUser setUpdatePage={setUpdatePage} key={id} id={id} login={login} fullName={fullName} avatar={avatar}/>
      )
      :
      <p>Loading</p>}
      {allUsers && allUsers.length === 0 && <p>No users ;(</p>}
    </div>
  )
}

export default AdminUsers;