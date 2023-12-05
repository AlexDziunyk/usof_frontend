import './style.css';
import { MdOutlineDelete } from "react-icons/md";
import axios from '../../axios/axios';

const AdminUser = ({setUpdatePage, id, login, fullName, avatar}) => {

  const deleteUser = async() => {
    const {data} = await axios.delete(`/user/delete/${id}`);
    setUpdatePage(data);
  }

  return (
    <div className='admin-user'>
      <div className='admin-user-data'>
        <div className='admin-user__avatar'>
          <img src={avatar} alt=''></img>
        </div>
        <p className='admin-user__login'>{login}</p>
        <p className='admin-user__fullname'>{fullName}</p>
      </div>
      <div onClick={deleteUser} className='admin-user__delete'>
        <MdOutlineDelete size={25}/>
      </div>
    </div>
  )
}

export default AdminUser;