import './style.css';
import { MdOutlineDelete } from "react-icons/md";
import axios from '../../axios/axios';

const AdminCategory = ({setUpdatePage, id, title, description, author}) => {

  const deleteCategory = async() => {
    const {data} = await axios.delete(`/categories/delete/${id}`);
    setUpdatePage(data);
  }

  return (
    <div>
      <div className='edit-category'>
        <div className="edit-category__icons">
          <div onClick={deleteCategory} className="edit-category__delete">
            <MdOutlineDelete size={25}/>
          </div>
        </div>
        <h4 className='edit-category__title'>{title}</h4>
        <p className='edit-category__description'>{description}</p>
      </div>
    </div>
  )
}

export default AdminCategory