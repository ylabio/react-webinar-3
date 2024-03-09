import React from "react";
import PropTypes from 'prop-types';
import Vidget from "../vidget";
import Button from "../button";
import './style.css';

function Controls({count, callback}) {
  return (
    <div className='Controls'>
      <div className="Controls-vidget">
        <Vidget count={count} title="В корзине:" full={true}/>
      </div>
      <Button style="Button_controls" callback={callback}>
        Перейти
      </Button>
    </div>
  )
}

// Typechecking with PropTypes:
Controls.propTypes = {
  count: PropTypes.shape({
    goods: PropTypes.number,
    costs: PropTypes.number
  }).isRequired,
  callback: PropTypes.func.isRequired
};

// Default values for properties:
Controls.defaultProps = {
  count: { goods: 0, costs: 0 },
  callback: () => {},
}

export default React.memo(Controls);
