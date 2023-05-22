import React from 'react';
import PropTypes from "prop-types";
import './style.css'
import Head from "../head";

const PopUp = ({isShown, onClick, children}) => {
  return (
    <>
      {isShown &&
        <div className={'PopUp'} onClick={() => onClick()}>
          <div className={'PopUp-content'} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      }
    </>
  );
};

PopUp.propTypes = {
  children: PropTypes.node
}

export default React.memo(PopUp);