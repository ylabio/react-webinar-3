import React from "react";
import {plural} from "../../utils";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Controls({list, setOpened}){
    const cn = bem('Controls');
    const totalCount = list.reduce((sum, item) => sum + item.count, 0);
    const totalCost = list.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className={cn()}>
      <div className={cn('info')}>В корзине:
        <span className={cn('important')}>{(totalCount) ? (`${totalCount} ${plural(totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} 
        / ${totalCost} ₽`) : ("пусто")}
        </span>
      </div>
      <div className={cn('actions')}>
          <button onClick={() => setOpened(true)}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  setOpened: () => {}
};

Controls.defaultProps = {
  setOpened: () => {}
}

export default React.memo(Controls);
