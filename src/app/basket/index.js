import { memo, useCallback, useEffect } from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { UI_TEXTS } from '../../consts/content';

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentLanguage: state.language.currentLanguage
  }));

  const currentLanguage = document.documentElement.lang;

  const uiText = {
    title: UI_TEXTS[currentLanguage].basket.head.headTitle,
    closeModalBtn: UI_TEXTS[currentLanguage].basket.head.closeModalBtn,
  }

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item}  productLink={`/product/${item._id}`} onRemove={callbacks.removeFromBasket} onClose={callbacks.closeModal}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={uiText.title} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
