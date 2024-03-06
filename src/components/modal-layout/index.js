import React from 'react'
import {cn as bem} from "@bem-react/classname"
import ModalHeader from '../modal-header'
import Overlay from '../overlay';
import ModalFooter from '../modal-footer';
import "./style.css"

function ModalLayout(props) {
  
  if (!props.isOpen) return null;
  const cn = bem('ModalCard');
  
  return (
  <Overlay onClose={props.onClose}>
    <div className={cn()}>
      <ModalHeader className = {cn("header")} onClose={props.onClose} modalTitle ={"Корзина"}/>
      <div className={cn("content")}>
       { props.children}
      </div>
      <ModalFooter className = {cn()} totalCost = {props.totalCost}/>
    </div>
  </Overlay>
  )
}

export default ModalLayout