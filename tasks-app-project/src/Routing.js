import React, { useEffect, useState } from 'react';
import App from "./App";
import Bloug from "./pages/Bloug/Bloug";
import NotFound from "./components/NotFound";
import PersonalArea from "./pages/PersonalArea/personalArea"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './pages/LoginScreen/Login';
import RegistrationFullProccess from './pages/RegistrationFullProccess/RegistrationFullProccess';



const Routing = () => {

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
          <Route path="/Registration/:step" element={<RegistrationFullProccess  setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        :
        <Routes>

          <Route path="/" element={<App />} />
          <Route path="/PersonalArea" element={<PersonalArea />} />
          <Route path="*" element={<NotFound />} />
        </Routes>}
    </BrowserRouter>
  )
}

export default Routing
