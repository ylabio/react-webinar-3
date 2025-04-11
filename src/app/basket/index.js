import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useSelector from '../../store/use-selector';
import useStore from '../../hooks/use-store';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.settings.language,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    translate: useCallback(key => store.actions.settings.translate(key), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            onCloseModal={callbacks.closeModal}
            language={select.language}
            title={callbacks.translate('remove')}
            units={callbacks.translate('pcs')}
          />
        );
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={callbacks.translate('cart')} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal
        sum={select.sum}
        language={select.language}
        totalTitle={callbacks.translate('total')}
      />
    </ModalLayout>
  );
}

export default memo(Basket);
