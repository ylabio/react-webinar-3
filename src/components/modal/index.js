import React from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function Modal({active, setActive, children}) {
  const cn = bem("Modal");
  return (
    <div className={active ? cn({active: true}) : cn() } onClick={() => {setActive(false)}}>
      <div className={active ? cn('content', { active: true }) : cn('content')} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;