import React from 'react'
import App from "./App";
import Bloug from "./pages/Bloug/Bloug"
import NotFound from "./components/NotFound"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


const Routing = () => {
  return (
    
    <BrowserRouter>

        <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="Bloug" element={<Bloug/>}/>
        <Route path="*" element={<NotFound />} />
        </Routes>
  </BrowserRouter>
  )
}

export default Routing
