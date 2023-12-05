import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setLoginAction } from "../../redux/slices/userSlice";
import { fetchUserLogin, fetchUserRegister, isAuthSelector } from "../../redux/slices/authSlice";
import ActionButton from "../ActionButton/ActionButton";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from '../../axios/axios';

import './style.css'


const ModalLogin = ({isModalOpened, setIsModalOpened}) => {

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  

  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const navigate = useNavigate();

  const validateLogin = async(e) => {
    e.preventDefault();
  
    const data = await dispatch(fetchUserLogin({login, password}));
    
    if(!data.payload) {
      setError("Error occured!")
      return;
    }
  
    if(data.payload.token) {
      localStorage.setItem("token", data.payload.token);
    }
  
    setLogin('');
    setPassword('');
    setIsModalOpened(false);
    navigate('/profile/me');
  }


  const registerUser = async(e) => {
    e.preventDefault();

    console.log(login, password, email)

    if(password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    const data = await dispatch(fetchUserRegister({login, email, password}));

    console.log("data", data)

    if(!data.payload) {
      setError("User already exists!")
      return;
    }

    if(data.payload.token) {
      localStorage.setItem("token", data.payload.token);
    }


    setLogin('');
    setPassword('');
    setEmail('');
    setRepeatPassword('');
    setIsModalOpened(false);
    
    navigate('/profile/me');
  }

  const resetPassword  = async(e) => {
    e.preventDefault();
    const {data} = await axios.post('/auth/password-reset', {email});
    console.log(data)
    setEmail('');
    setLoginType('wait');
  }



  const [loginType, setLoginType] = useState('login');

  useEffect(() => {
    setError('');
  }, [loginType])

  return (
    <>
      {loginType === 'login' && 
        <div onClick={() => setIsModalOpened(false)} className="modal-login">
          <div onClick={e => e.stopPropagation()} className='modal-login__container'>
            <h1 className="modal-login__title">Join Our Community</h1>
              <form className="modal-login__form" onSubmit={validateLogin}>
                <TextField
                  required
                  id="outlined-required"
                  label="Login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <ActionButton text={"Sign In"}/>
                <div className="modal-login__register">
                  <p>Still doesn't have an account?</p>
                  <p onClick={() => setLoginType("register")} className="modal-login_link">Sign Up</p>
                  <p className="modal-login_link" onClick={() => setLoginType("reset-password")}>Reset password</p>
                </div>
                <div>{error}</div>
              </form>
          </div>
        </div>
      }
      {loginType === 'register' &&
      <div onClick={() => setIsModalOpened(false)} className="modal-login">
        <div onClick={e => e.stopPropagation()} className='modal-login__container'>
          <h1 className="modal-login__title">Join Our Community</h1>
            <form className="modal-login__form" onSubmit={registerUser}>
              <TextField
                required
                id="outlined-required"
                label="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Repeat Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <ActionButton text={"Sign Up"}/>
              <div className="modal-login__register">
                <p>Already have an account?</p>
                <p onClick={() => setLoginType("login")} className="modal-login_link">Sign In</p>
                <p className="modal-login_link" onClick={() => setLoginType("reset-password")}>Reset password</p>
              </div>
              <div className="error">{error}</div>
            </form>
        </div>
      </div>
    } 
    {loginType === 'reset-password' &&
      <div onClick={() => setIsModalOpened(false)} className="modal-login">
        <div onClick={e => e.stopPropagation()} className='modal-login__container'>
          <h1 className="modal-login__title">Join Our Community</h1>
            <form className="modal-login__form" onSubmit={resetPassword}>
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ActionButton text={"Reset Password"}/>
              <div className="modal-login__register">
                <p>Already have an account?</p>
                <p onClick={() => setLoginType("login")} className="modal-login_link">Sign In</p>
              </div>
              <div className="error">{error}</div>
            </form>
        </div>
      </div>
    } 
    {loginType === 'wait' &&
      <div onClick={() => setIsModalOpened(false)} className="modal-login">
        <div onClick={e => e.stopPropagation()} className='modal-login__container'>
          <h1 className="modal-login__title">Check your email :)</h1>
        </div>
      </div>
    } 
   
    </>
  )
}

export default ModalLogin;