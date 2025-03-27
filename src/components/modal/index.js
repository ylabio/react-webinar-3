import React from 'react';
import { forwardRef, useImperativeHandle , useRef} from "react"
import { createPortal } from "react-dom";
import './style.css'

const Modal = forwardRef( function Modal ({children},ref){
 const dialogRef = useRef();
    useImperativeHandle(ref,()=>{
        return {
            open(){
                dialogRef.current.showModal()
            },
            close(){
                dialogRef.current.close()
            }
        }
    })
    return createPortal(
        <dialog ref={dialogRef} className='modal'>
            {children}
        </dialog>,
        document.getElementById("modal-root")  
    )
})

export default Modal