import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Hint({ title, show }) {
  if (!show) return null;

  return <div className="Hint">{title}</div>
}

Hint.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default React.memo(Hint);