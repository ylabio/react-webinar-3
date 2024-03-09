import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

function Modal({active, setActive, children}) {
  const cn = bem("Modal");
  return (
    <div className={active ? cn({active: true}) : cn() } onClick={() => {setActive(false)}}>
      <div className={active ? cn('content', { active: true }) : cn('content')} onClick={(e) => e.stopPropagation()}>
        <button className={cn('button')} onClick={() => setActive(false)}>Закрыть</button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  children: PropTypes.node
}

export default React.memo(Modal);