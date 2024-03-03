import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onOpenBasket}) {
  return (
    <div className='Controls'>
      <button onClick={() => onOpenBasket()}>Показать</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
