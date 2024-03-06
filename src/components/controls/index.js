import React from "react";
import PropTypes from 'prop-types';
import Vidget from "../vidget";
import Button from "../button";
import './style.css';

function Controls({cart, callback}) {
  return (
    <div className='Controls'>
      <div className="Controls-vidget">
        <Vidget cart={cart} title="В корзине:" full={true}/>
      </div>
      <Button style="Button_controls" callback={callback}>
        Перейти
      </Button>
    </div>
  )
}

// Typechecking with PropTypes:
Controls.propTypes = {
  cart: PropTypes.shape({
    goods: PropTypes.number,
    costs: PropTypes.number
  }).isRequired,
  callback: PropTypes.func.isRequired
};

// Default values for properties:
Controls.defaultProps = {
  cart: { goods: 0, costs: 0 },
  callback: () => {},
}

export default React.memo(Controls);
