import React from "react";
import PropTypes from 'prop-types';
import Button from "../button";
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
      <Button style="Button_controls" callback={forOpen}>
        Перейти
      </Button>
    </div>
  )
}

// Typechecking with PropTypes:
Controls.propTypes = {
  forOpen: PropTypes.func.isRequired,
};

// Default values for properties:
Controls.defaultProps = {
  forOpen: () => {},
}

export default React.memo(Controls);
