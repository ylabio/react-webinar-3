import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { langData } from '../../store/language/langData';

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.currentLanguage
  }));

  const translations = {
    cart: langData[select.language].cart,
    itemBasket: {
      one: langData[select.language].things.one,
      few: langData[select.language].things.few,
      removeBtn: langData[select.language].buttons.remove,
    },
    modalLayout: {
      close: langData[select.language].buttons.close,
    },
    basketTotal: {
      total: langData[select.language].total
    }
  }

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
        translations={translations.itemBasket}
        onRemove={callbacks.removeFromBasket}
        link={`product/${item._id}`}
        onCloseModal={callbacks.closeModal}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={translations.cart} onClose={callbacks.closeModal} translations={translations.modalLayout}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} translations={translations.basketTotal}/>
    </ModalLayout>
  );
}

export default memo(Basket);
