import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useAppContext } from '../../app-context';
import { STRINGS } from '../../const';

function Basket({ title, total, textButton, piece }) {
  const store = useStore();
  const { language } = useAppContext();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket
          item={item}
          onRemove={callbacks.removeFromBasket}
          onClose={callbacks.closeModal}
          textButton={textButton}
          piece={piece}
        />;
      },
      [callbacks.removeFromBasket, textButton],
    ),
  };

  return (
    <ModalLayout title={title} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} total={total}/>
    </ModalLayout>
  );
}

export default memo(Basket);
