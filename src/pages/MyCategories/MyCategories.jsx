import { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import './style.css';

import EditCategory from '../../components/EditCategory/EditCategory';

const MyCategories = () => {
  
  const [myCategories, setMyCategories] = useState([]);
  const [updatePage, setUpdatePage] = useState(null);

  useEffect(() => {
    const getMyCategories = async() => {
      const {data} = await axios.get('/user/myCategories');
      setMyCategories(data.myCategories);
    }
    getMyCategories();
  }, [updatePage])

  return (
    <div className="my-categories">
      {myCategories ? myCategories.map(({id, title, description, author}) => 
        <EditCategory setUpdatePage={setUpdatePage} key={id} id={id} author={author} title={title} description={description}/>
      )
      :
      <p>Loading</p>}
      {myCategories && myCategories.length === 0 && <p>You have no categories ;(</p>}
    </div>
  )
}

export default MyCategories