import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ButtonCart from '../button-cart';

function Controls({ setIsOpen, totalCount, totalPrice}) {
  return (
    <>
      <div>
        <ButtonCart
          setIsOpen={setIsOpen}
          totalCount={totalCount}
          totalPrice={totalPrice}
        />
      </div>
    </>
  );
}

Controls.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired
};

export default React.memo(Controls);
