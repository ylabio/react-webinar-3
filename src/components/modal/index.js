import React from "react";
import './style.css';
import List from "../list/index";

function Modal({list, callback, buttonTitle}){
  return (
    <div className="modal">
      <List list={list}
            callback={callback}
            buttonTitle={buttonTitle}
            // onSelectItem={callbacks.onSelectItem}
            />
      {/* {children} */}
    </div>
  )
}

export default Modal;