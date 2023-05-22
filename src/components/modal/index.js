import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import Portal from "../portal";
import Overlay from "../overlay";
import {useModal} from "../../hooks";
import "./style.css";
import {memo} from "react";


function Modal({ children, isOpen, onClose, title }) {

  const cn = bem("Modal");

  const { closeHandler } = useModal({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <Portal>
      <div className={cn({ opened: isOpen })}>
        <Overlay onClick={closeHandler} />
        <div className={cn("content")}>
          {title && <div className={cn("header")}>
            {title}
            <button className={cn("close-btn")} onClick={closeHandler}>Закрыть</button>
          </div>}
          <div className={cn("body")}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default memo(Modal);