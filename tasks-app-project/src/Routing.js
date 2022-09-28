import React, { useEffect, useState } from 'react';
import App from "./App";
import Bloug from "./pages/Bloug/Bloug";
import NotFound from "./components/NotFound";
import PersonalArea from "./pages/PersonalArea/personalArea"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './pages/LoginScreen/Login';
import Registration from './pages/RegistrationScreen/Registration';
import TreatmentPlanSelectionScreen from './pages/TreatmentPlanSelectionScreen/TreatmentPlanSelectionScreen';
import UserBodyData from './pages/UserBodyData/UserBodyData';



const Routing = () => {
  let tokenFromSession;
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const tokenFromSession = sessionStorage.getItem('token')
    if (tokenFromSession) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => { console.log(isAuthenticated) }, [isAuthenticated])
  return (


    <BrowserRouter>

      {!isAuthenticated ?
        <Routes>
          <Route path="/" element={<Bloug />} />
          <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          <Route path='/Registration' element={<Registration />} />
          <Route path='/TreatmentPlanSelectionScreen' element={<TreatmentPlanSelectionScreen />} />
          <Route path='/UserBodyData' element={<UserBodyData/>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        :
        <Routes>

          <Route path="/" element={<App />} />
          <Route path="PersonalArea" element={<PersonalArea />} />
          <Route path="*" element={<NotFound />} />
        </Routes>}
    </BrowserRouter>
  )
}

export default Routing
