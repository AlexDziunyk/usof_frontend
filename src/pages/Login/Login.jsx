import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setLoginAction } from "../../redux/slices/userSlice";
import { fetchUserLogin, isAuthSelector } from "../../redux/slices/authSlice";
import './style.css';
const Login = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);

  const validateLogin = async(e) => {
    e.preventDefault();

    const data = await dispatch(fetchUserLogin({login, password}));

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
    return <Navigate to="/posts"/>;
  } else {
    return (
      <div className="login__container">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={validateLogin}>
            <input placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} ></input>
            <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
            <button className="navbar__button">CLICK</button>
          </form>
        </div>
      </div>
    )
  }

}

export default Login;