import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import CloseIcon from '../../accets/close.svg';



function ModalLayout({title, visible = false, setVisible=()=>{}, children }) {
  const cn = bem("Modal");

  return (
    <div className={visible ? cn() + " active" : cn()} >
      <div   className={cn("content")}  onClick={(e) => e.stopPropagation()}>
       <div className={cn("head")}>
          <h1>{title}</h1>
          <button onClick={() => setVisible(false)}>
              <img src={CloseIcon} alt="Close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node,
  setVisible:PropTypes.func.isRequired,
};

export default React.memo(ModalLayout);
