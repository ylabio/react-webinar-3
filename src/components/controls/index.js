import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import BasketTool from '../basket-tool';
import Navbar from '../navbar';

function Controls({ openModalBasket, translations }) {
  return (
    <div className="Controls">
      <Navbar translations={translations} />
      <BasketTool onOpen={openModalBasket} translations={translations} />
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default memo(Controls);
