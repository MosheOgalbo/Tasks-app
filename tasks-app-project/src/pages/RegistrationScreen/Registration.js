import React, { useEffect, useState } from 'react';
import "./Registration.css"
import { useNavigate } from "react-router-dom";

const Registration = ({setRegistrationData,registrationData}) => {
  const navigate = useNavigate()
  
  const onChangeData = (e) => {
    localStorage.setItem(e.target.className, e.target.value)
    setRegistrationData(prev => ({ ...prev, [e.target.className]: e.target.value }))
  }

const BackMain =()=>{
  window.localStorage.clear();
  navigate('/')
} 
  useEffect(() => {
    // console.log(registrationData)
  }, [registrationData])


  return (
    <div className='registrationScreen'>

      <div className='oneRegistrationForm'>
        <form autocomplete="off">
          <div className='userInformation'>

            <label for='userName'>user Name</label>
            <input className='userName' id='userName' type={"text"} value={registrationData.userName} placeholder="Please enter a user Name"
              onChange={(e) => { onChangeData(e) }} autocomplete="nope" />

            <label for='fullName'> full Name </label>
            <input className='fullName' id='fullName' type={"text"} value={registrationData.fullName} placeholder="Please enter a full Name "
              onChange={(e) => { onChangeData(e) }} autocomplete="nope" />

            <label for='email'> email </label>
            <input className='email' id='email' type={"email"} value={registrationData.email} placeholder="Please enter a email  "
              onChange={(e) => { onChangeData(e) }} autocomplete="nope" />

            <label for='password'> password </label>
            <input className='password' id='password' type={"password"} value={registrationData.password} placeholder="Please enter a password "
              onChange={(e) => { onChangeData(e) }} autocomplete="off" />

            <label for='phoneNumber'> phone Number</label>
            <input className='phoneNumber' id='phoneNumber' type={"text"} value={registrationData.phoneNumber} placeholder="Please enter a phone Number "
              onChange={(e) => { onChangeData(e) }} autocomplete="nope" />

            <label form='activePhysicalUser'> active Physical: </label>
            <div>
            <label for='activePhysical-yes'> yes </label>
              <input className='activePhysical' id='activePhysical-yes' type={"radio"} value={true}   name={"radio"} placeholder="Please enter a active Physical "
                onChange={(e) => { onChangeData(e) }} checked={registrationData.activePhysical === "true"} />

                <label for='activePhysical-no'> no </label>
              <input className='activePhysical' id='activePhysical-no' type={"radio"} value={false}   name={"radio"} placeholder="Please enter a active Physical "
                onChange={(e) => { onChangeData(e) }} checked={registrationData.activePhysical === "false"}  />
            </div>

          </div>

          <div>
            <button className="Registration-Customer" onClick={() => navigate('/Registration/2')} type="button">Next</button>
            
          </div>
          <button className="Registration-Customer" onClick={() =>BackMain()} type="button">Back to the main page</button>
        </form>
      </div>

    </div>
  )
}

export default Registration
