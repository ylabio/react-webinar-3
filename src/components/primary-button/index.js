import React from 'react';
import PropTypes from "prop-types";
import './style.css'

const PrimaryButton = ({description, onClick}) => {
  return (
    <button className={'PrimaryButton'} type={"button"} onClick={() => onClick()}>
      {description}
    </button>
  );
};

PrimaryButton.propTypes = {
  description: PropTypes.string,
  onClick: PropTypes.func
};

PrimaryButton.defaultProps = {
  onClick: () => {}
}

export default React.memo(PrimaryButton);