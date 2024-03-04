import React from "react";
import PropTypes from 'prop-types';
import './style.css';

/* COMPONENTS TODO:
component controls:
 - component vidget
 - component button */

function Controls({forOpen}) {
  return (
    <div className='Controls'>
      <div className='Controls-vidget'>В корзине:
        <strong className='Controls-vidget-inform'>пусто</strong>
      </div>
      <button className="Controls-button" onClick={(event) => {
        forOpen();
        event.stopPropagation();
        }
      }>
        Перейти
      </button>
    </div>
  )
}

// Typechecking with PropTypes:
Controls.propTypes = {
  forOpen: PropTypes.func,
};

// Default values for properties:
Controls.defaultProps = {
  forOpen: () => {},
}

export default React.memo(Controls);
