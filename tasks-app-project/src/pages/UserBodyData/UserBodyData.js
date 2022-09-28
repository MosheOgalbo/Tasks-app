import React from 'react'
import { useNavigate } from "react-router-dom";
const UserBodyData = () => {
  const navigate = useNavigate()
  return (
    <div>
      <button className="Registration-next" onClick={() => navigate('/PersonalArea')} type="button">Create a user</button>   
      <button className="Registration-Back" onClick={() => navigate('/TreatmentPlanSelectionScreen')} type="button">Back</button>
    </div>
  )
}

export default UserBodyData
