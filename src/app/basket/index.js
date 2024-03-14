import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {

  const store = useStore();

  const language = useSelector(state => ({
    language: state.language.language,
    basketTextRu: {...state.language.ru.basket, ...state.language.ru.values},
    basketTextEn: {...state.language.en.basket, ...state.language.en.values},
    itemTextRu: {...state.language.ru.itemPage, ...state.language.ru.values},
    itemTextEn: {...state.language.en.itemPage, ...state.language.en.values},
    headTextRu: state.language.ru.head,
    headTextEn: state.language.en.head,
  }));
  
  const modalLayoutText = language.language === "ru" ? language.headTextRu : language.headTextEn;
  const itemText = language.language === "ru" ? language.itemTextRu : language.itemTextEn;
  const basketText = language.language === "ru" ? language.basketTextRu : language.basketTextEn;

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} closeModal={callbacks.closeModal} itemText={itemText}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={basketText.title} onClose={callbacks.closeModal} modalText={modalLayoutText}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} basketText={basketText}/>
    </ModalLayout>
  );
}

export default memo(Basket);
