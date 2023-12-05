import './style.css';
import { fetchAuthMe, isAuthSelector, roleSelector } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import ActionButton from '../../components/ActionButton/ActionButton';
import axios from '../../axios/axios';

import {app} from '../../firebase/app'; 
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";

import { v4 as uuidv4 } from 'uuid';

const ProfileMe = () => {
  const [userData, setUserData] = useState(null);
  const [fullName, setFullName] = useState('');
  const [fullNameRedact, setFullNameRedact] = useState(false);
  const [fullNameSave, setFullNameSave] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarNow, setAvatarNow] = useState('');

  useEffect(() => {
    const getUserData = async() => {
      const {data} = await axios.get('/auth/me');
      setUserData(data);
      setAvatarNow(data.avatar)
      setFullName(data.fullName);
    }
    getUserData();
  }, [])

  const handleChangeFullName = () => {
    setFullNameRedact(true);
    setFullNameSave(fullName);
  }

  const handleCancelChange = () => {
    setFullNameRedact(false);
    setFullName(fullNameSave);
  }

  const handleSaveChange = async() => {
    const {data} = await axios.patch('/user/changeFullName', {fullName});
    setFullName(data.fullName);
    setFullNameRedact(false);
  }

  const handleChangeAvatar = async(e) => {
    console.log(e.target.files[0]);
    setAvatar(e.target.files[0]);
  } 

  const handleCancelAvatar = async() => {
    setAvatar(null);
  }


  const storage = getStorage(app);

  const handleSaveAvatar = async() => {
    const id = uuidv4();
    const avatarRef = ref(storage, `Avatars/${id}`);

    uploadBytes(avatarRef, avatar).then(snapshot => {
      console.log("File uploaded!");
      getDownloadURL(avatarRef).then(async(url) => {
        const {data} = await axios.patch('/user/changeAvatar', {avatar: url});
        setAvatarNow(data.avatar);
      })
    })
    setAvatar(null);
  }

  return (
    <div className='profile-me'>
      <div className='profile-me__container'>
        <div className='profile-me__avatar'>
          <img className='profile-me__avatar-img' src={avatarNow}></img>
          {!avatar &&<input onChange={handleChangeAvatar} type="file" id="files" className="profile-me__avatar-input-hidden"/>}
          {!avatar && <label className="profile-me__avatar-input" htmlFor="files">Change Avatar</label>}
          {avatar && <button onClick={handleSaveAvatar} className='profile-me__fullname_button-green'>Save</button>}
          {avatar && <button onClick={handleCancelAvatar} className='profile-me__fullname_button-red'>Cancel</button>}
        </div>
        <div className='profile-me__data'>
          <div className='profile-me__login'>Login: {userData && userData.login}</div>
          <div className='profile-me__fullname'>
            <p className='profile-me__fullname-text'>Full Name:</p>
            <TextField
              required
              id="outlined-required"
              label="Change Full Name"
              value={fullName}
              disabled={!fullNameRedact}
              onChange={(e) => setFullName(e.target.value)}
            />
            {!fullNameRedact && <button onClick={handleChangeFullName} className='profile-me__fullname_button-green'>Change Full Name</button>}
            {fullNameRedact && <button onClick={handleSaveChange} className='profile-me__fullname_button-green'>Save</button>}
            {fullNameRedact && <button onClick={handleCancelChange} className='profile-me__fullname_button-red'>Cancel</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileMe