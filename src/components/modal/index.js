import React, {useRef} from "react";
import PropTypes from "prop-types";
import './style.css'

function Modal({children,setBasketOpen}){
    const ref=useRef()
    const closeBasketBack=(e)=>{
        if(e.target==ref.current){
           setBasketOpen(false)  
        }
        
    }
    return(<div onClick={(e)=>closeBasketBack(e)} ref={ref} className="Modal">
        <div className='Modal-center'> 
           {children} 
        </div>

    </div>)
}

Modal.propTypes = {
    children: PropTypes.node,
    setBasketOpen: PropTypes.func,
  }
export default Modal;