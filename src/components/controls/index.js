import React from "react";
import {plural} from '../../utils';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Controls({list, setOpenCart}){
  const cn = bem('Controls');
  const totalCount = list.length;
  const totalCost = list.reduce((sum, item) => sum + item.price * item.count, 0);
  return (
    <div className={cn()}>
      <div className={cn('info')}>В корзине:
        <span className={cn('important')}>{(totalCount) ? (`${totalCount} ${plural(totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} 
        / ${Intl.NumberFormat('ru-RU').format(totalCost)} ₽`) : ("пусто")}
        </span>
      </div>
      <div className={cn('actions')}>
          <button onClick={() => setOpenCart(true)}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  setOpenCart: () => {}
};

Controls.defaultProps = {
  setOpenCart: () => {}
}
export default React.memo(Controls);
