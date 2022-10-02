import React from 'react'
import { useNavigate } from "react-router-dom";
import "./TreatmentPlanSelectionScreen.css"

const TreatmentPlanSelectionScreen = ({ setRegistrationData }) => {
  const onChangeData = (e) => {
    localStorage.setItem(e.target.className, e.target.value)
    setRegistrationData(prev => ({ ...prev, activePhysical: e.target.value }))
    //console.log(e.target.typeTreatment, e.target.value)
  }
  const navigate = useNavigate()
  return (
    <div className='Tracks-screen'>

      <h1>Tracks types of training </h1>

      <div className='select-Tracks'>

        <button className='activePhysical' type={"button"} value={"BASIC"}  onClick={(e) => { onChangeData(e) }}>
          <div className='Tracks'>
            <div className='Track-title'>
              <h2>BASIC</h2>
            </div>
            <h6>6 months</h6>
          </div>
        </button>

        <button className='activePhysical' type={"button"} value={"PLUS"}  onClick={(e) => { onChangeData(e) }}>
          <div className='Tracks'>
            <div className='Track-title'>
              <h2>PLUS</h2>
            </div>

            <h6>4 months</h6>
          </div>
        </button>

        <button className='activePhysical' type={"button"} value={"PRO"}  onClick={(e) => { onChangeData(e) }}>
          <div className='Tracks'>
            <div className='Track-title'>
              <h2>PRO</h2>
            </div>

            <h6>3 months</h6>
          </div>
        </button>

      </div>
      <div>
        <button className="Registration-next" onClick={() => navigate('/Registration/3')} type="button">Next</button>
        <button className="Registration-Back" onClick={() => navigate('/Registration/1')} type="button">Back</button>
      </div>
    </div>
  )
}

export default TreatmentPlanSelectionScreen


//להוסיף סוג טיפול ופרטי נתוני הגוף של המשתמש 