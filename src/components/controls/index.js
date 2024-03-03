import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";
import ShopSum from "../shop-sum";

function Controls({ showModal, items }) {
  return (
    <div className='Controls'>
      <div className='Controls-info'>
        В корзине:
        <span className='Controls-sum'>
          {items.length ? (
            <>
              {items.length} {plural(items.length, {one: 'товар', few: 'товара', many: 'товаров'})}
              {' '}/{' '}
              <ShopSum list={items} />
            </>
          ) : (
            'пусто'
          )}
        </span>
      </div>
      <button onClick={() => showModal(true)}>Показать</button>
    </div>
  )
}

Controls.propTypes = {
  showModal: PropTypes.func,
  items: PropTypes.array
};

Controls.defaultProps = {
  showModal: () => {}
}

export default React.memo(Controls);
