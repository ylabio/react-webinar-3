import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    localText: state.languages.text[state.languages.currentLanguage],
  }));

  const callbacks = {
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return (
          <ItemBasket
            localText={select.localText}
            item={item}
            link={`/product/${item._id}`}
            onRemove={callbacks.removeFromBasket}
            closeModal={callbacks.closeModal}
          />
        );
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={select.localText.titleBasket} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal localText={select.localText} sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
