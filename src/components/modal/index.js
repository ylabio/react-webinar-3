import React from "react";
import { cn as bem } from "@bem-react/classname";

import ReactPortal from "../portal-wrapper";

import "./style.css";

function Modal({ isOpen, closeModal, children }) {
  const cn = bem("Modal");

  if (!isOpen) return null;

  return (
    <ReactPortal>
      <div className={cn()}>
        <div className={cn("inner")}>
          <button className={cn("closeBtn")} onClick={closeModal}>
            Закрыть
          </button>
          {children}
        </div>
      </div>
    </ReactPortal>
  );
}

export default React.memo(Modal);
