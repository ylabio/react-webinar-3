import {memo, useCallback} from "react";
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
    selectedLanguage: state.language.language,
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
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            onClose={callbacks.closeModal}
            selectedLanguage={select.selectedLanguage}
            productLink={"/products/"}
          />
        );
      },
      [callbacks.removeFromBasket]
    ),
  };

  return (
    <ModalLayout title="Корзина" onClose={callbacks.closeModal} selectedLanguage={select.selectedLanguage}>
      <List list={select.list} renderItem={renders.itemBasket} selectedLanguage={select.selectedLanguage}/>
      <BasketTotal sum={select.sum} selectedLanguage={select.selectedLanguage} />
    </ModalLayout>
  );
}

export default memo(Basket);
