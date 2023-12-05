import './style.css';
import {useState, useEffect} from 'react';
import axios from '../../axios/axios';
import AdminCategory from '../../components/AdminCategory/AdminCategory';
import EditCategory from '../../components/EditCategory/EditCategory';

const AdminCategories = () => {

  const [allCategories, setAllCategories] = useState([]);
  const [updatePage, setUpdatePage] = useState(null);

  useEffect(() => {
    const getAllMyComments = async() => {
      const {data} = await axios.get('/admin/categories');
      setAllCategories(data.allCategories);
    }
    getAllMyComments();
  }, [updatePage])


  return (
    <div className='admin-categories'>
      {allCategories ? allCategories.map(({id, author, title, description}) => 
        <EditCategory setUpdatePage={setUpdatePage} key={id} id={id} author={author} title={title} description={description}/>
      )
      :
      <p>Loading</p>}
      {allCategories && allCategories.length === 0 && <p>No categories ;(</p>}
    </div>
  )
}

export default AdminCategories;