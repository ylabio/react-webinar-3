import React from "react";
import PropTypes from 'prop-types';
import Button from "../button";
import './style.css';

function Controls({title, onEntryCart}) {
  return (
    <div className='Controls'>
      <Button title={title} buttonFunction={onEntryCart} />
    </div>
  )
}

Controls.propTypes = {
  title: PropTypes.string,
  onEntryCart: PropTypes.func,
};

Controls.defaultProps = {
  onEntryCart: () => {},
}

export default React.memo(Controls);
