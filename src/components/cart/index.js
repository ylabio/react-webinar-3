import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { editTime } from "../../utils";

function Controls({ setActive, count, total}){
  return (
    <div className='Controls'>
      <div className='cart-row' >
        {`В корзине: ${editTime(count)} / ${total} ₽`}
      </div>
      <button onClick={() => setActive(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setActive: PropTypes.func,
  count: PropTypes.number,
  total: PropTypes.number
};

Controls.defaultProps = {
  setActive: () => {}
}

export default React.memo(Controls);
