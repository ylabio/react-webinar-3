import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { useModal } from "../modalContext";
import { plural,formatPrice } from "../../utils";

function Controls({basketList,info}) {
  const {onModalVisible} = useModal();
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);

  
  useMemo(() => {
    if (info != undefined){
      setSum(info[0].sum)
      setCount(info[0].count);
    }
  },[basketList])
    

  const countPlural = `${count} ${plural(count,
    {one: 'товар',
      few: 'товара',
      many: 'товаров'})} / ${formatPrice(sum)} ₽`
  
  return (
    <div className='Controls'>
      {basketList.length !=0 ?
      <div className="basket-info">В корзине: <span>{countPlural}</span></div>
      :
      <div className="basket-info">В корзине: <span> пусто</span></div>
      }
      
      <button className="Controls-btn" onClick={() => {onModalVisible()}}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onBasketVisible: PropTypes.func
};

Controls.defaultProps = {
  onBasketVisible: () => {}
}

export default React.memo(Controls);
