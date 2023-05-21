import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({ setModal, count, total }) {

  return (
    <>
      <div className='Controls'>
        <div>В корзине:</div>

        {count > 0 ?
          <div className='Controls-price'>
            {count} {plural(count, { one: 'товар', few: 'товара', many: 'товаров' })} / {total.toLocaleString('ru-RU')} ₽</div> :
          <div className='Controls-price'>пусто</div>
        }
        <button onClick={() => setModal(true)}>Перейти</button>
      </div>
    </>
  )
}

Controls.propTypes = {
  setModal: PropTypes.func
};

Controls.defaultProps = {
  setModal: () => { }
}

export default React.memo(Controls);
