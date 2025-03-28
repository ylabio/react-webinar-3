import React from 'react';
import { plural } from '../../utils';
import Icon from '../icon';
import './style.css';

function Controls({
  onTotalClick = () => {},
  total: { price = 0, count = 0 },
}) {
  return (
    <div className="Controls">
      <button onClick={onTotalClick} disabled={!count}>
        <Icon name="cart" width={24} height={24} />

        <span>
          {!count ? 'Пусто' : <>
            {`${count} ${plural(count, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${price} `}
            &#8381;
          </>}
        </span>
      </button>
    </div>
  );
}

export default React.memo(Controls);
