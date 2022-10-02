import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";
import '../../App.css'
const validator = require('validator');

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);


  const [userType, setUserType] = useState("Customers");
  const [errorMessage, setErrorMessage] = useState("");

  const validatorLogin = () => {
    let validFlag = true
    setErrorMessage(" ")
    if (!userName && !password) {
      setErrorMessage("There are no values ​​in the fields")
      validFlag = false
    }
    if (userName.length > 20 || password.length > 20) {
      setErrorMessage("The data is too long")
      validFlag = false
    }
    if (userName.length < 8 || password.length < 8) {
      setErrorMessage("The data length is too short")
      validFlag = false
    }
    if (!validator.isEmail(userName)) {
      setErrorMessage("Invalid email")
      validFlag = false
    }
    if (errorMessage === "Request failed with status code 500") {
      setErrorMessage("No such user exists")
      validFlag = false
    }
    if(validFlag){
      login();
    }
      }

  const login = async () => {
    try {
      const nameQuery = userType === 'Customers' ? "loginCustomers" : "providers"
      //console.log(userName, password)
      const postDataProvider = { email: userName, password }
      const userLogin = await axios.post(`http://localhost:7001/api/${nameQuery}`, postDataProvider)
      const token = await userLogin.data;

      if (token.tokanpassword) { sessionStorage.setItem('token', token.tokanpassword); }

      setIsAuthenticated(true)
      navigate('PersonalArea');
    } catch (e) {
      setErrorMessage(e.message)
      console.log(e.message)
    }
  }

  // useEffect(()=>{

  // }, [])

  return (
    <div className="login-marg">
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

              <button className="login-Customer" onClick={validatorLogin} type="button">login</button>

            </div>
          </form>

        </div>
      </div>
      <div>
        {errorMessage === "" ? <h4>Please enter login details</h4> : errorMessage}
      </div>
    </div>
  )
}

export default Login;
