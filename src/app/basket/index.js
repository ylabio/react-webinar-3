import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import text from "../../text";

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language || 'ru',
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
        return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} text={text[select.lang]} />;
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={text[select.lang].basket} onClose={callbacks.closeModal}>
      <List>{select.list?.map((item) => <ItemBasket key={item._id} item={item} onRemove={callbacks.removeFromBasket} text={text[select.lang].delButton} />)}</List>
      <BasketTotal sum={select.sum} text={text[select.lang]} />
    </ModalLayout>
  );
}

export default memo(Basket);
