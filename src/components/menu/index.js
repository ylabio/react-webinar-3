import PropTypes from 'prop-types';
import HomeBtn from './home-btn';
import BasketTool from '../basket-tool';
import './style.css'

const Menu = ({ onOpen, amount, sum }) => {
  return (
    <div className="Menu">
      <HomeBtn />
      <BasketTool onOpen={onOpen} amount={amount} sum={sum} />
    </div>
  );
};

Menu.propTypes = {
  onOpen: PropTypes.func,
  amount: PropTypes.number,
  sum: PropTypes.number,
}

export default Menu;