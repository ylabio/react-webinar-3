import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    // multilingualism: state.catalog.multilingualism,
    language: state.language.type,
    langModalLayout: state.language.modalLayout,
    langButtonRemove: state.language.itemBasket.buttonRemove,
    langTotal: state.language.basketTotal.total,
    // langType: state.language.type,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return (
        <ItemBasket item={item} onRemove={callbacks.removeFromBasket} 
                    buttonRemove={select.langButtonRemove[select.language]}/>
      );
    }, [callbacks.removeFromBasket, select.langButtonRemove[select.language]]),
  };

  return (
    <ModalLayout multilingualText={select.langModalLayout} 
                  language={select.language} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} 
            buttonRemove={select.langButtonRemove[select.language]}/>
      <BasketTotal sum={select.sum} total={select.langTotal[select.language]}/>
    </ModalLayout>
  );
}

export default memo(Basket);
