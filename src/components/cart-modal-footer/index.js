import React from 'react';
import './style.css';
import Controls from '../controls';
import { cn as bem } from '@bem-react/classname';
import { formatPrice } from '../../utils';

function CartModalFooter({finalPrice}){

  const price = formatPrice(finalPrice);

  const cn = bem("ModalFooterItem");
  
  return(
        <div className={cn()}>
          <div className={cn('colloum')}>
            <b>Итого:</b>
          </div>
          <div className={cn("price")}>
            <b>{price}</b>
          </div>
          <div className={cn("actions")}>
            <Controls disabled={true} title="Удалить"/>
          </div>
        </div>
    )
}
export default CartModalFooter;