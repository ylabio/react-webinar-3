import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { translate } from '../../utils';

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,

    lang: state.language.lang,
  }));
  // const text = translate()
  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    //Переход на страницу товара
    onTransition: useCallback((_id) => {
      store.actions.productDetails.load(_id);
      store.actions.modals.close();
    },[]),
  }
  const text = translate('basket', select.lang);
  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket
        item={item}
        onTransition={callbacks.onTransition}
        onRemove={callbacks.removeFromBasket}
        url='/articles'
        text={text.itemBasket}
      />
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout text={text.modal} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal text={text.basketTotal} sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
