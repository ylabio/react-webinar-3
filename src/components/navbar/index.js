import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router';
import BasketTool from '../basket-tool';

function Navbar(props) {
  return (
    <div className="Navbar">
      <Link to="/">Главная</Link>
      <BasketTool onOpen={props.onOpen} amount={props.amount} sum={props.sum} />
    </div>
  );
}

Navbar.propTypes = {
  onOpen: PropTypes.func.isRequired,
  amount: PropTypes.number,
  sum: PropTypes.number,
};

export default memo(Navbar);
