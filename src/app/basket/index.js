import {memo, useCallback, useMemo} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { translate } from '../../language/translator';

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.currentLang
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket
        item={item}
        link={`card/${item._id}`}
        onRemove={callbacks.removeFromBasket}
        itemsLabel={translator.dictionary.cart.items}
        removeButtonTitle={translator.dictionary.controls.remove}
        onClose={callbacks.closeModal}
      />
    }, [callbacks.removeFromBasket]),
  };

  const translator = {
    dictionary: useMemo(() => translate(select.language))
  }

  return (
    <ModalLayout title={translator.dictionary.cart.title} onClose={callbacks.closeModal} closeButtonTitle={translator.dictionary.controls.close}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} totalText={translator.dictionary.cart.total}/>
    </ModalLayout>
  );
}

export default memo(Basket);
