import './style.css';
import PropTypes from 'prop-types';

const CartItem = ({ item, deleteItem }) => {
  return (
    <div className='CartItem'>
      <div className='CartItem-left'>
        <div className='CartItem-code'>{item.code}</div>
        <div className='CartItem-title'>{item.title}</div>
      </div>
      <div className='CartItem-right'>
        <div className='CartItem-price'>{item.price.toLocaleString()} ₽</div>
        <div className='CartItem-count'>{item.count} шт</div>
        <button onClick={() => deleteItem(item.code)}>Удалить</button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }),
  deleteItem: PropTypes.func,
};

CartItem.defaultProps = {
  deleteItem: () => {},
};

export default CartItem;
