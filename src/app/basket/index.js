import { memo, useCallback } from "react";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/hooks/use-store";
import useSelector from "../../store/hooks/use-selector";
import { useNavigate } from "react-router-dom";
import { useTranslateContext } from "../../contexts/translate-context";

function Basket() {
  const store = useStore();

  const navigate = useNavigate();

  const { translate, currentLocale, constructOptionsByLocale } =
    useTranslateContext();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),

    navigateToItemPage: useCallback((_id) => {
      navigate(`item/${_id}`);
      callbacks.closeModal();
    }, []),

    translate: useCallback(
      (resourseKey) => translate(resourseKey),
      [translate]
    ),

    constructOptionsByLocale: useCallback(
      (valueName) => constructOptionsByLocale(valueName),
      [constructOptionsByLocale]
    ),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            onTitleClick={callbacks.navigateToItemPage}
            t={callbacks.translate}
            optionsConstructor={callbacks.constructOptionsByLocale}
            locale={currentLocale}
          />
        );
      },
      [callbacks.removeFromBasket]
    ),
  };

  return (
    <ModalLayout
      title={translate("basket")}
      onClose={callbacks.closeModal}
      modalBtnText={translate("close")}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} t={callbacks.translate} />
    </ModalLayout>
  );
}

export default memo(Basket);
