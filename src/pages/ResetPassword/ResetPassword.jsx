import { useState } from 'react';
import './style.css';
import TextField from '@mui/material/TextField';
import axios from '../../axios/axios';
import {useParams, useSearchParams} from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState();

  const handleResetPassword = async() => {
    console.log(searchParams.get("id"), searchParams.get("token"));
    if(password !== repeat) {
      setError('Fields are not the same');
      return;
    }
    const {data} = await axios.get(`/auth/password-reset/submit/${searchParams.get("id")}/${searchParams.get("token")}`);
    if(data.status === "success") {
      setMessage("Success!");
    }
  }

  return (
    <>
      {!message ? <div className='reset-password'>
        <h2>Reset Password</h2>
        <TextField
          required
          id="outlined-required"
          label="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Repeat password"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
        />
        <button onClick={handleResetPassword} className='reset-button'>Reset password</button>
        {error}
      </div>
      :
      <div className='reset-password-msg'>
        <h1 className='reset-message'>{message}</h1>
      </div>
      }
    </>
  )
}

export default ResetPassword