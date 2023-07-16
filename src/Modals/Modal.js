import React from 'react'
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';


const ModalOverlay = (props)=>{
  const stopPropagationHandler = (event) => {
    event.stopPropagation();
  };

    return (
        <div className={classes.modal} onClick={()=>{props.onClick()}}>
          <div className={classes.content} onClick={stopPropagationHandler}>{props.children}</div>
        </div>
        
    )
}

const portalElement = document.getElementById('overlays')

const Modal=(props)=> {
  return (
    <>
    {ReactDOM.createPortal(<ModalOverlay onClick={props.onClose} >{props.children}</ModalOverlay>, portalElement)}    
    </>
  )
}



export default Modal