import React from 'react'
import { useNavigate } from "react-router-dom";
import "./TreatmentPlanSelectionScreen.css"

const TreatmentPlanSelectionScreen = () => {
  const navigate = useNavigate()
  return (
    <div className='Tracks-screen'>

      <h1>Tracks types of training </h1>

      <div className='select-Tracks'>
        <button   type={"radio"} value={true} name={"radio"}>
          <div className='Tracks'>
            <div className='Track-title'>
              <h2>PRO</h2>
            </div>
            <h6>6 months</h6>
          </div>
        </button>
        <button  type={"radio"} value={true} name={"radio"}>
          <div className='Tracks'>
            <div className='Track-title'>
              <h2>PLUS</h2>
            </div>

            <h6>4 months</h6>
          </div>
        </button>
        <button  type={"radio"} value={true} name={"radio"}>
          <div className='Tracks'>
            <div className='Track-title'>
              <h2>PLUS</h2>
            </div>

            <h6>3 months</h6>
          </div>
        </button>

      </div>
      <div>
        <button className="Registration-next" onClick={() => navigate('/UserBodyData')} type="button">Next</button>
        <button className="Registration-Back" onClick={() => navigate('/Registration')} type="button">Back</button>
      </div>
    </div>
  )
}

export default TreatmentPlanSelectionScreen


//להוסיף סוג טיפול ופרטי נתוני הגוף של המשתמש 