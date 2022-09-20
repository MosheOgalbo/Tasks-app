import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

const Login = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [userType, setUserType] = useState("Customers");

  const LoginCustome = async () => {
    try {
      console.log(userName, password)
      const postDataCustome = { email: userName, password }
      const userLogin = await axios.post("http://localhost:8000/api/loginCustomers", postDataCustome)
      const token = await userLogin.data;
      // console.log(token)
      if (token.tokanpassword) { sessionStorage.setItem('token', token.tokanpassword); }
      navigate('Bloug');

    } catch (e) {
      console.log(e.message)
    }
  }
  const LoginProvider = async () => {
    try {
      console.log(userName, password)
      const postDataProvider = { email: userName, password }
      const userLogin = await axios.post("http://localhost:8000/api/providers", postDataProvider)
      const token = await userLogin.data;
      // console.log(token)
      if (token.tokanpassword) { sessionStorage.setItem('token', token.tokanpassword); }
      navigate('Bloug');
    } catch (e) {
      console.log(e.message)
    }
  }

  // useEffect({

  // }, [])

  return (
    <div className="login-screen">
      <h1> {"Login to the Physical training system of " + userType} </h1>

      <div className="loginSystem">

        <div className="selec-Type-User">
          <div><button className="radioButtons" type="button" onClick={() => { setUserType("Customers") }}> Customers</button></div>
          <div><button className="radioButtons" type="button" onClick={() => { setUserType("Providers") }} >Providers</button></div>
        </div>
        <form autocomplete="off">

          <div className="login">

            <label form='userName'>{userType + " email"}</label>
            <input className='userName' type={"text"} placeholder="Please enter an existing username"
              onChange={(e) => { setUserName(e.target.value) }} autocomplete="off" />

            <label form='password'> {userType + " password"} </label>
            <input className='password' type={"password"} placeholder="Please enter an existing password"
              onChange={(e) => { setPassword(e.target.value) }} autocomplete="off" />

            {userType === "Customers" ?
              <button className="login-Customer" onClick={() => LoginCustome()} type="button">login</button>
              :
              <button className="login-Provider" onClick={() => LoginProvider()} type="button">login</button>}
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login
