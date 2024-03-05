import React from "react";
import PropTypes from 'prop-types';
import Vidget from "../vidget";
import Button from "../button";
import './style.css';

/* COMPONENTS TODO:
component controls:
 - component vidget
 - component button */

function Controls({forOpen, cart}) {
  return (
    <div className='Controls'>
      <Vidget cart={cart} />
      <Button style="Button_controls" callback={forOpen}>
        Перейти
      </Button>
    </div>
  )
}

// Typechecking with PropTypes:
Controls.propTypes = {
  forOpen: PropTypes.func.isRequired,
  cart: PropTypes.shape({
    goods: PropTypes.number,
    costs: PropTypes.number
  }),
};

// Default values for properties:
Controls.defaultProps = {
  forOpen: () => {},
}

export default React.memo(Controls);
