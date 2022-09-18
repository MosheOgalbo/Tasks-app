import React from 'react'
import axios from 'axios'

const Login = () => {
  let userName, password;
  const loginEntrance = async () => {

    const userLogin = await axios.post("http://localhost:8000/api/loginCustomers", { userName, password })
    const token = await userLogin.data;
    sessionStorage.setItem('token', token)
  }

  return (
    <div className="loginSystem">
      <form autocomplete="off">
        <label form='userName'>user</label>
        <input className='userName' type={"text"} placeholder="אנא הזן שם משתמש קיים " value={userName} autoComplete="off" />
        <label form='password'>password </label>
        <input className='password' type={"password"} placeholder=" אנא הזן סיסמה " value={password} autoComplete="off" />
        <button onClick={() => loginEntrance()} type="button">login</button>
      </form>
    </div>
  )
}

export default Login
