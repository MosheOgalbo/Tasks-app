import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import SystemMessage from '../../components/SystemMessage';
import './UserBodyData.css'

const UserBodyData = ({ createNewCustomer, errorMessage, setRegistrationData, registrationData, setErrorMessage }) => {

  const [show, setShow] = useState(false)
  
  const navigate = useNavigate();
  const handleClose = () => {setErrorMessage('')}
  const handleGoon = () => {/*do something*/}

  const onChangeData = (e) => {
    localStorage.setItem(e.target.className, e.target.value)
    setRegistrationData(prev => ({ ...prev, bodyData: { ...prev.bodyData, [e.target.className]: e.target.value } }))
  }

  useEffect(()=>{
    if(errorMessage){
        setShow(true)
    }
    else{
       setShow(false)
      }
    
  },[errorMessage])

  return (
    <div className='data-marg'>
      {show && <SystemMessage modalType="ERROR" text={errorMessage} handleClose={handleClose} show={show}/>}
      <div className='BodyData-screen'>
        <p>User body structure data</p>
        <div className='input-data'>
          <div className='Bod-input' >

            <div className='information-field'>
              <label for='age'> Age</label>
              <input className='age' id='age' type={"text"} placeholder="Please enter a user age"
                onChange={(e) => { onChangeData(e) }} value={registrationData.bodyData.age} autocomplete="nope" />
            </div>
            <div className='information-field'>
              <label for='height'> Body height</label>
              <input className='height' id='height' type={"text"} placeholder="Please enter a Body height"
                onChange={(e) => { onChangeData(e) }} value={registrationData.bodyData.height} autocomplete="nope" />
            </div>
            <div className='information-field'>
              <label for='weight'>Body weight</label>
              <input className='weight' id='weight' type={"text"} placeholder="Please enter a Body weight"
                onChange={(e) => { onChangeData(e) }} autocomplete="nope" value={registrationData.bodyData.weight} />
            </div>
            <div className='information-field'>
              <label for='scope'>{"Abdominal \n circumference"}</label>
              <input className='scope' id='scope' type={"text"} placeholder="Please enter  a Abdominal circumference"
                onChange={(e) => { onChangeData(e) }} autocomplete="nope" value={registrationData.bodyData.scope} />
            </div>
          </div>
        </div>
        <div className='Status-buttons'>
        <button className="Registration-next" onClick={() => createNewCustomer()} type="button">Create a user</button>
        <button className="Registration-Back" onClick={() => navigate('/Registration/2')} type="button">Back</button>
        </div>

      </div>
    </div>
  )
}

export default UserBodyData
