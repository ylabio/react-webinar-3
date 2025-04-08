import { memo, useCallback, useEffect } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import useTranslate from '../../hooks/useTranslate';

function Basket() {
  const t = useTranslate();
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    catalogLoaded: state.catalog.list.length > 0, // Добавляем флаг загрузки каталога
  }));

  // Загрузка каталога при открытии корзины
  useEffect(() => {
    if (!select.catalogLoaded) {
      store.actions.catalog.load();
    }
  }, [select.catalogLoaded, store]);

  const callbacks = {
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => (
        <ItemBasket
          item={item}
          onRemove={callbacks.removeFromBasket}
          onCloseModal={callbacks.closeModal}
          textDelete={t.delete}
        />
      ),
      [callbacks.removeFromBasket, callbacks.closeModal],
    ),
  };

  return (
    <ModalLayout title="Корзина" onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
