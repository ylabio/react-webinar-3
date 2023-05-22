import React, { useMemo } from 'react';
import List from '../list';

const Cart = ({products, remove}) => {

  const totalPrice = useMemo(() => {
    return products.reduce((acc, item) => acc += item.price * item.count, 0).toLocaleString('ru')
  }, [products])

  return (
    <div>
      {
          products.length
          ? <>
              <List list={products} remove={remove} isCart={true}/>
              <div className="total">Итого: <span>{totalPrice} &#8381;</span></div>
            </>
          : <h2 className="empty-cart">В корзине пусто</h2>
        }
    </div>
  );
};

export default Cart;