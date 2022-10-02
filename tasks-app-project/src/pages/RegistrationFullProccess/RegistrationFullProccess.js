import React, { useState } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Registration from '../RegistrationScreen/Registration';
import TreatmentPlanSelectionScreen from '../TreatmentPlanSelectionScreen/TreatmentPlanSelectionScreen';
import UserBodyData from '../UserBodyData/UserBodyData';
import axios from 'axios';
const validator = require('validator');

const RegistrationFullProccess = ({ setIsAuthenticated }) => {
    const navigate = useNavigate()
    const { step } = useParams();
    const [errorMessage, setErrorMessage] = useState("");

    const [registrationData, setRegistrationData] = useState({
        userName: localStorage.getItem('userName') || '',
        fullName: localStorage.getItem('fullName') || '',
        email: localStorage.getItem('email') || '',
        phoneNumber: localStorage.getItem('phoneNumber') || '',
        password: localStorage.getItem('password') || '',
        activePhysical: localStorage.getItem('activePhysical') || '',
        typeTreatment: localStorage.getItem('typeTreatment') || "BASIC",
        bodyData: {
            age: localStorage.getItem('age') || '',
            height: localStorage.getItem('height') || '',
            weight: localStorage.getItem('weight') || '',
            scope: localStorage.getItem('scope') || ''
        }

    })



    const createNewCustomer = async () => {
        try {

            const creatCustomer = await axios.post("http://localhost:7001/api/customers", registrationData)
            const token = await creatCustomer.data;

            if (token.tokanpassword) { sessionStorage.setItem('token', token.tokanpassword); }

            setIsAuthenticated(true)
            localStorage.clear()
            navigate('/');
        } catch (e) {
            //console.log(registrationData)
            setErrorMessage(e.message)
            console.log(e)
        }
    }


    if (step === "1") return <Registration registrationData={registrationData} setRegistrationData={setRegistrationData} />
    else if (step === "2") return <TreatmentPlanSelectionScreen setRegistrationData={setRegistrationData} />
    else if (step === "3") return <UserBodyData registrationData={registrationData} createNewCustomer={createNewCustomer} errorMessage={errorMessage} setRegistrationData={setRegistrationData} />


    return (
        <div>can't process registration for step number {step}</div>
    )
}

export default RegistrationFullProccess
