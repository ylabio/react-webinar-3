import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Cart from "../cart";

function Controls({title='Перейти', onEntryCart, calculateSum, calculateItems}) {
  return (
    <div className='Controls'>
      {/* вынести карт на апп уровень? */}
      <Cart calculateItems={calculateItems} calculateSum={calculateSum} />
      <button onClick={onEntryCart}>{title}</button>
    </div>
  )
}

Controls.propTypes = {
  title: PropTypes.string,
  onEntryCart: PropTypes.func,
  calculateSum: PropTypes.func,
  calculateItems: PropTypes.func,
};

Controls.defaultProps = {
  onEntryCart: () => {},
  calculateSum: () => {},
  calculateItems: () => {},
}

export default React.memo(Controls);
