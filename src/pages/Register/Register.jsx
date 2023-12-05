import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setLoginAction } from "../../redux/slices/userSlice";
import './style.css';
import { fetchUserRegister, isAuthSelector } from "../../redux/slices/authSlice";

const Register = () => {

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);

  const registerUser = async(e) => {
    e.preventDefault();

    if(password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    const data = await dispatch(fetchUserRegister({login, email, password}));

    if(!data.payload) {
      return;
    }

    if(data.payload.token) {
      localStorage.setItem("token", data.payload.token);
    }

    setLogin('');
    setPassword('');

  }

  if(isAuth) {
    return <Navigate to="/posts"/>
  } else {
    return (
      <div className="register__container">
        <div className="register">
          <h1>Register</h1>
          <form onSubmit={registerUser}>
            <input required placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}></input>
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
            <input required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
            <input required placeholder="Repeat password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} ></input>
            <button type="submit" className="navbar__button">Register</button>
          </form>
          <h3>{error}</h3>
        </div>
      </div>
    )
  }
}

export default Register;