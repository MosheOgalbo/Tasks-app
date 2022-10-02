import React from 'react';
import { GiShinyApple, GiWeightLiftingUp, GiSkeletonInside } from 'react-icons/gi';
import { GoPlus } from "react-icons/go";
import { FaEquals } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import './Bloug.css';
const Bloug = () => {
    const navigate = useNavigate()
    return (
        <div style={{ height: '150%' }}>
            <div className='Toolbar-support-header'>
                <div className="fixed-containers">
                    <img alt="logo" src='' /></div>
                <div className="fixed-containers fixed-container-right">
                    <img alt='system-phone' src='' />
                </div>
            </div>
            <div className='Company-details'>
                <div className='motivation'>
                    <p>
                        Are you ready to achieve the weight, fat percentage, and appearance you've always wanted, and enjoy it for years through a diet and training method
                    </p>
                </div>
                <div className='percentage-section wf-section'>
                    <div className='percentage-box' >
                        <GiShinyApple />
                    </div>
                    <div>
                        <GoPlus />
                    </div>
                    <div className='percentage-box'>
                        <GiWeightLiftingUp />
                    </div>
                    <div>
                        <FaEquals />
                    </div>
                    <div className='percentage-box'>
                        <GiSkeletonInside />
                    </div>
                    <div className='system-buttons'>
                    <button className='login' onClick={()=>navigate('/Login')} type="button" >login</button>
                    <button className='Registration' onClick={()=>navigate('/Registration/1')} type="button">Registration</button>
                </div>
                </div>
               
            </div>
            
        </div>
    )
}

export default Bloug
