import './style.css';
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import axios from '../../axios/axios';
import {useNavigate} from 'react-router-dom';

const EditCategory = ({setUpdatePage, id, title, description, author}) => {

  const navigate = useNavigate();

  const deleteMyCategory = async() => {
    const {data} = await axios.delete(`/categories/delete/${id}`);
    setUpdatePage(data);
  }

  const editMyCategory = async() => {
    navigate(`/profile/mycategories/editCategory/${id}`);
  }

  return (
    <div>
      <div className='edit-category'>
        <div className="edit-category__icons">
          <div onClick={editMyCategory} className="edit-category__edit">
            <MdOutlineEdit size={25}/>
          </div>
          <div onClick={deleteMyCategory} className="edit-category__delete">
            <MdOutlineDelete size={25}/>
          </div>
        </div>
        <h4 className='edit-category__title'>{title}</h4>
        <p className='edit-category__description'>{description}</p>
      </div>
    </div>
  )
}

export default EditCategory