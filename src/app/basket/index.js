import { memo, useCallback } from "react";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemLink from "./item-link";

function Basket() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    data: state.translate.data,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            textPcs={select.data.basket.pcs}
            textDeletetBtn={select.data.basket.deleteItemBasketBtn}
            children={
              <ItemLink
                id={item._id}
                title={item.title}
                closeModal={callbacks.closeModal}
              />
            }
          />
        );
      },
      [callbacks.removeFromBasket]
    ),
  };

  return (
    <ModalLayout
      title={select.data.basket.titleBasket}
      onClose={callbacks.closeModal}
      textCloseBtn={select.data.basket.closeBasketBtn}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} text={select.data.basket.totalBasketText} />
    </ModalLayout>
  );
}

export default memo(Basket);
