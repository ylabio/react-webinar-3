import React from "react";
import Controls from "../../controls";
import './style.css';

export const CartHead = (props) => {
  return (
    <div className='Cart-head'>
      <h1>{props.title}</h1>
      <Controls
        innerText='Закрыть'
        onClick={() => props.setIsCartShow(false)}
      />
    </div>
  )
}