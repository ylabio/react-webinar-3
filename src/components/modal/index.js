import React, {useRef} from "react";
import PropTypes from "prop-types";
import Head from "../head";
import Controls from "../controls";
import {cn as bem} from '@bem-react/classname';
import './style.css'

function Modal({title,setBasketOpen,children}){
    const cn = bem('Modal');
    const ref=useRef()
    const closeBasketBack=(e)=>{
        if(e.target==ref.current){
           setBasketOpen(false)  
        }
        
    }
    return(<div className={cn()} onClick={(e)=>closeBasketBack(e)} ref={ref}>
        <div className={cn()+'center'}>
           <Head title={title}><Controls name='Закрыть' onButton={()=>setBasketOpen(false)}/></Head>
           <div className={cn()+'Children'}> 
              {children}  
           </div>
       
        </div>
        
    </div>)
}

Modal.propTypes = {
    title:PropTypes.string,
    children: PropTypes.node,
    setBasketOpen: PropTypes.func,
  }
export default Modal;