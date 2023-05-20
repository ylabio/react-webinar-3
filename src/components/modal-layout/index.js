import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function ModalLayout({isModalOpen, children}) {
  const cn = bem("ModalLayout");

  return (
    <div className={`${cn()} ${isModalOpen && cn("opened")}`}>
      <div className={cn("container")}>
        {children}
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  isModalOpen: PropTypes.bool,
};

export default React.memo(ModalLayout);