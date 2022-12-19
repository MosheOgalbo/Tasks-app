import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ReactModal, {Body, Footer, Header, Title} from 'react-modal';



ReactModal.setAppElement('#root');
// WARNING ERROR


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


const SystemMessage = ({modalType, title="Error", text, handleClose, handleGoon=(()=>{}), show }) => {
    return (
        <>
            <ReactModal
                isOpen={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={customStyles}
            >
                <div>

                    {title}
                </div>
               <div>

                    {text}
               </div>

                <div>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {modalType === "WARNING" &&<Button variant="primary" onClick={handleGoon}>Continue</Button>}
                </div>
              
            </ReactModal>
        </>
    );
}

export default SystemMessage
