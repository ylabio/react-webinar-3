import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartIcon from '../icons/cart-icon';
import { localeNumber } from '../../utils';

function Controls({ onModalOpen = () => {}, store }) {
  return (
    <div className="Controls">
      <button className="Controls-button" onClick={() => onModalOpen()}><CartIcon />{`${localeNumber(store.getCartPrice())} ₽`}</button>
    </div>
  );
}

Controls.propTypes = {
  onModalOpen: PropTypes.func,
  getCartPrice: PropTypes.func,
};

export default React.memo(Controls);
