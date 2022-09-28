import React, { useEffect, useState } from 'react';
import "./Registration.css"

const Registration = () => {
  const [registrationData, setRegistrationData] = useState({
    userName: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    typeTreatment: "",
    activePhysical: true

  })
  const onChangeData = (e) => {
    setRegistrationData(prev => ({ ...prev, [e.target.className]: e.target.value }))
  }

 useEffect(
  ()=>{ console.log(registrationData)
},[registrationData])

  return (
    <div className='registrationScreen'>

      <div className='oneRegistrationForm'>
        <form autocomplete="off">
          <div className='userInformation'>

            <label form='userName'>user Name</label>
            <input className='userName' type={"text"} placeholder="Please enter a user Name"
              onChange={(e) => { onChangeData(e) }}    autocomplete="nope" />

            <label form='fullName'> full Name </label>
            <input className='fullName' type={"text"} placeholder="Please enter a full Name "
              onChange={(e) => { onChangeData(e) }}   autocomplete="nope" />

            <label form='emailUser'> email </label>
            <input className='emailUser' type={"email"} placeholder="Please enter a email  "
              onChange={(e) => { onChangeData(e) }}  autocomplete="nope"/>

            <label form='password'> password </label>
            <input className='password' type={"password"} placeholder="Please enter a password "
              onChange={(e) => { onChangeData(e) }}  autocomplete="off"  />

            <label form='phoneNumberUser'> phone Number</label>
            <input className='phoneNumberUser' type={"text"} placeholder="Please enter a phone Number "
              onChange={(e) => { onChangeData(e) }}   autocomplete="nope" />

            <label form='typeTreatmentUser'> type Treatment </label>
            <input className='typeTreatmentUser' type={"text"} placeholder="Please enter a type Treatment "
              onChange={(e) => { onChangeData(e) }}   autocomplete="nope" />

            <label form='activePhysicalUser'> active Physical </label>
            <div>
              <input className='activePhysicalUser' type={"radio"} value={true} name={"radio"} placeholder="Please enter a active Physical "
                onChange={(e) => { onChangeData(e) }}  />
              <input className='activePhysicalUser' type={"radio"} value={false} name={"radio"} placeholder="Please enter a active Physical "
                onChange={(e) => { onChangeData(e) }}  />
            </div>

          </div>

          <div>
            <button className="login-Customer" onClick={() => console.log(registrationData)} type="button">login</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Registration
