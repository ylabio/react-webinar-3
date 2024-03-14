import { memo, useCallback } from "react";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import useTranslation from "../../hooks/useTranslation";

function Basket() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language,
  }));

  console.log(select.lang);

  const [getTranslation] = useTranslation(select.lang);

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
            onClose={callbacks.closeModal}
            getTranslation={getTranslation}
            linkTo={`/products/${item._id}`}
          />
        );
      },
      [callbacks.removeFromBasket]
    ),
  };

  return (
    <ModalLayout
      title={getTranslation("cart")}
      onClose={callbacks.closeModal}
      getTranslation={getTranslation}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} getTranslation={getTranslation} />
    </ModalLayout>
  );
}

export default memo(Basket);
