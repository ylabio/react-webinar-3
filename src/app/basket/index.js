import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { translations } from '../../utils';

function Basket({ language }) {
  const listTransfers = translations[language];
  const store = useStore();
  const select = useSelector(state => {
    const basketState = {
      list: state.basket.list,
      amount: state.basket.amount,
      sum: state.basket.sum,
      open: state.modals.name === 'basket',
    };
    console.log(basketState);
    return basketState;
  });

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} language={language} />;
      },
      [callbacks.removeFromBasket, language],
    ),
  };

  return (
    <ModalLayout title={listTransfers.basket} onClose={callbacks.closeModal} open={select.open}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} language={language} />
    </ModalLayout>
  );
}

export default memo(Basket);
