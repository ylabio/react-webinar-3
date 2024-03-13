import {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket({ t }) {  
  const store = useStore();
  const title = t('basket');

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} t={t}/>
    }, [callbacks.removeFromBasket, t]),
  };

  return (
    <ModalLayout title={title} onClose={callbacks.closeModal} t={t}>
      <List list={select.list} renderItem={renders.itemBasket} t={t}/> 
      <BasketTotal sum={select.sum} t={t}/>
    </ModalLayout>
  );
}

Basket.propTypes = {
  t: PropTypes.func,
};

export default memo(Basket);
