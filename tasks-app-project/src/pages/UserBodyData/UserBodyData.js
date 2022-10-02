import React from 'react'
import { useNavigate } from "react-router-dom";
const UserBodyData = ({ createNewCustomer, errorMessage, setRegistrationData, registrationData }) => {
  const navigate = useNavigate();
  
  const onChangeData = (e) => {
    localStorage.setItem(e.target.className, e.target.value)
    setRegistrationData(prev => ({ ...prev, bodyData: { ...prev.bodyData, [e.target.className]: e.target.value } }))
  }



  return (
    <div>
      <p>User body structure data</p>
      <div>
        <div>

          <div>
            <label for='age'> Age</label>
            <input className='age' id='age' type={"text"} placeholder="Please enter a user age"
              onChange={(e) => { onChangeData(e) }} value={registrationData.bodyData.age}  autocomplete="nope" />
          </div>
          <div>
            <label for='height'> Body height</label>
            <input className='height' id='height' type={"text"} placeholder="Please enter a Body height"
              onChange={(e) => { onChangeData(e) }}  value={registrationData.bodyData.height}  autocomplete="nope" />
          </div>
          <div>
            <label for='weight'>Body weight</label>
            <input className='weight' id='weight' type={"text"} placeholder="Please enter a Body weight"
              onChange={(e) => { onChangeData(e) }} autocomplete="nope" value={registrationData.bodyData.weight} />
          </div>
          <div>
            <label for='scope'>Abdominal circumference</label>
            <input className='scope' id='scope' type={"text"} placeholder="Please enter a Abdominal circumference"
              onChange={(e) => { onChangeData(e) }} autocomplete="nope" value={registrationData.bodyData.scope} />
          </div>
        </div>
      </div>
      <button className="Registration-next" onClick={() => createNewCustomer()} type="button">Create a user</button>
      <button className="Registration-Back" onClick={() => navigate('/Registration/2')} type="button">Back</button>
      <div>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  )
}

export default UserBodyData
