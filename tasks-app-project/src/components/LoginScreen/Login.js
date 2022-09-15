import React from 'react'

const Login = () => {

  return (
    <div className="loginSystem">
       <form>
        <label  form='userName'>user</label>
        <input className='userName' type={"text"} placeholder="אנא הזן שם משתמש קיים "  />
        <label form='password'>password </label>
        <input className='password' type={"password"} placeholder=" אנא הזן סיסמה "/>
        <button >
          <span>login</span>
        </button>
      </form>
    </div>
  )
}

export default Login
