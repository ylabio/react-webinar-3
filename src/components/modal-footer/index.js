import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { price_format } from '../../utils';

function ModalFooter({ label = "", totalPrice = 0 }) {
  return (
    <div className="ModalFooter">
        <div className="ModalFooter-label"><b>{label}</b></div>
        <div className="ModalFooter-totalPrice"><b>{price_format(totalPrice)}</b></div>
    </div>
  );
};

ModalFooter.propTypes = {
  label: PropTypes.node,
  totalPrice: PropTypes.number,
};

export default React.memo(ModalFooter);