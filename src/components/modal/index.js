import React from "react";

import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

import Button from "../button";
import Actions from "../actions";
import CloseIcon from "../icons/close-icon";

import "./style.css";


function Modal({children, onChangeViewModal = () => {}}) {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <Actions className={cn("actions")}>
          <Button className={cn("close")} onClickButton={onChangeViewModal}>
            <CloseIcon className={cn("close--icon")}/>
          </Button>
        </Actions>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onChangeViewModal: PropTypes.func,
};

export default React.memo(Modal);
