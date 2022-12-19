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

        <div className='activePhysicalContainer' >
          <div className='Tracks'>
            <div className='pricing-wrapper'>
              <div className='Track-title'>
                <h2>PRO</h2>
              </div>
              <h6>6 months</h6>
              <button className='activePhysical' type={"button"} value={"BASIC"} onClick={(e) => { onChangeData(e) }}>PRO</button>
            </div>
          </div>
        </div>

        <div className='activePhysicalContainer' >
          <div className='Tracks'>
            <div className='pricing-wrapper'>
              <div className='Track-title'>
                <h2>PLUS</h2>
              </div>
              <h6>6 months</h6>
              <button className='activePhysical' type={"button"} value={"BASIC"} onClick={(e) => { onChangeData(e) }}>PLUS</button>
            </div>
          </div>
        </div>

        <div className='activePhysicalContainer' >
          <div className='Tracks'>
            <div className='pricing-wrapper'>
              <div className='Track-title'>
                <h2>BASIC</h2>
              </div>
              <h6>6 months</h6>
              <button className='activePhysical' type={"button"} value={"BASIC"} onClick={(e) => { onChangeData(e) }}>BASIC</button>
            </div>
          </div>
        </div>

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