import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useNavigate } from 'react-router-dom';

function Basket() {

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    valueLang: state.language.valueLang,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Переход на страницу с товаром
    showCardProduct: useCallback(_id => {
      store.actions.product.loadProduct(_id), [store];
      store.actions.modals.close(), [store];
      navigate(`/product_page/${_id}`);
    }),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return (
        <ItemBasket 
          item={item} 
          onRemove={callbacks.removeFromBasket} 
          onProduct={callbacks.showCardProduct}
          valueLang={select.valueLang}
        />
      );
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout 
      title={ select.valueLang ? 'Корзина' : 'Cart' } 
      onClose={callbacks.closeModal}
      valueLang={select.valueLang}
    >
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal 
        sum={select.sum}
        valueLang={select.valueLang}
      />
    </ModalLayout>
  );
}

export default memo(Basket);
