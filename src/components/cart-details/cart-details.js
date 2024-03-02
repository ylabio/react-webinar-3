import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import List from '../list';
import './style.css';

function CartDetails({isOpen, setIsOpen, items, cart, onRemove, cost}) {

  const modalRef = useRef(null);

  useEffect(() =>{
    isOpen && modalRef.current.showModal();
  }, [isOpen]);

  useEffect(() => {
    const onEscClose = (e) => {
      if(e.keyCode === 27) setIsOpen(false);
    }
    window.addEventListener('keydown', onEscClose);
    return () => window.removeEventListener('keydown', onEscClose);
  }, []);

  const onClose = () => {
    modalRef.current.close();
    setIsOpen(false);
  }

  return (
    <dialog className='Cart-details' ref={modalRef}>
      <Head title='Корзина'>
      <button onClick={onClose}>
        Закрыть
      </button>
      </Head>
      <List list={items}
            amounts={cart}
            onDelete={onRemove}
      />
      <p className='Cart-details-total'>
        <span>Итого</span>
        <span className='Cart-details-total-sum'>{cost}&nbsp;₽</span>
      </p>
    </dialog>
  )
}

CartDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.exact({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  cart: PropTypes.objectOf(PropTypes.number).isRequired,
  onRemove: PropTypes.func,
  cost: PropTypes.number.isRequired,
};

export default React.memo(CartDetails);