import React from 'react';
import PropTypes from "prop-types";
import "./style.css";

function UniversalBtn({ onClick, btnText }) {
  return (
    <button onClick={onClick} className="UniversalBtn">
      {btnText}
    </button>
  );
}

UniversalBtn.propTypes = {
  onAdd: PropTypes.func,
  btnText: PropTypes.string,
};

UniversalBtn.defaultProps = {
  onClick: () => {},
  btnText: "",
};

export default React.memo(UniversalBtn);
