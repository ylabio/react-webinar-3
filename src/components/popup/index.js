import React, {useCallback} from 'react';
// import CheckoutItem from '../checkout-item';
import PropTypes from 'prop-types';
import './style.css';
import List from '../../components/list';

const Popup = ({closePopup, title, cart, onDeleteItem}) => {

	const callbacks = {
		closePopup: () => {
		  closePopup();
		},
		onDeleteItem: useCallback((code) => {
			onDeleteItem(code);
		  }, [])
	  }

  const handleClosePopupOverly = (event) => {
    if (event.currentTarget === event.target) {
		callbacks.closePopup();
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      className='popup'
      onClick={handleClosePopupOverly}
      aria-label='закрыть модальное окно'
    >
      <div className='popup__wrapper'>
        <div className='popup__header'>
          <h2 className='popup__title'>{title}</h2>
          <div className='popup__button'>
            <button onClick={()=>callbacks.closePopup()}>Закрыть</button>
          </div>
        </div>
		<div className="popup__margin-top"></div>
			<List list={cart.cartList}
						buttonName = 'Удалить'
				buttonClickAction ={callbacks.onDeleteItem}
				isCartItem={true}
				totalPrice={cart.totalPrice}
			/>
		<div className="popup__margin-bottom"></div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  children: PropTypes.node,
  closePopup: PropTypes.func,
};

Popup.defaultProps = {
	closePopup: () => {},
};

export default React.memo(Popup);