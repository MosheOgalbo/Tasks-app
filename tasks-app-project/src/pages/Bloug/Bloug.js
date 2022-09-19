import React from 'react'
import './Bloug.css';
const Bloug = () => {
    return (
        <div>
            <div className='Toolbar-support-header'>
                <div><img alt="logo" src='' /></div>
                <div><img alt='system-phone' /></div>
            </div>
            <div className='Company-details'>
                <div className='motivation'>
                    <p>
                        האם אתה מוכן להשיג את המשקל, אחוז השומן, והמראה שתמיד רצית, ולהנות ממנו למשך שנים ע״י שיטת תזונה ואימונים
                    </p>
                </div>
                <div className='percentage-section wf-section'>
                    <div className='percentage-box'></div>
                    <div className='percentage-box'></div>
                    <div className='percentage-box'></div>

                </div>
            </div>
        </div>
    )
}

export default Bloug
