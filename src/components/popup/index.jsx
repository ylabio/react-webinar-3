import React from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

const Popup = ({ setOpenPopup, children }) => {
  const cn = bem("Popup");
  const sortRef = React.useRef(null);

  const hidePopup = (event) => {
    if (!sortRef.current.innerHTML.includes(event.target.innerHTML)) {
      setOpenPopup(false);
    }
  };

  return (
    <div className={`${cn()}`} onClick={hidePopup}>
      <div className={cn("container")} ref={sortRef}>
        {children}
      </div>
    </div>
  );
};
Popup.propTypes = {
  setOpenPopup: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default React.memo(Popup);
