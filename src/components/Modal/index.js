import React from "react";
import './style.css';

function Modal({isActive, children}) {

    return (
      <div className={isActive ? "Modal-background" : ""}> 
        <div className={isActive ? "Modal-container" : "Modal-disable"}>
          {children}   
          {/* 
          *
          * Убрал всю лишнюю верстку из Модалки (Оставил только затемнение и сам контейнер). Содержимое перенес и хранится в компоненте cart
          *
          */}
        </div>
      </div>
    )

}

export default React.memo(Modal);