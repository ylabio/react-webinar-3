import { memo, useCallback } from 'react';
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
    locale: state.i18n.locale
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
        onRemove={callbacks.removeFromBasket}
        // передаю только используемые компонентом переводы
        locale={{
          pcs: select.locale.pcs,
          deleteBtnTitle: select.locale.Delete
        }}
      />
    }, [callbacks.removeFromBasket, select.locale]),
  };

  return (
    <ModalLayout
      title={select.locale.Cart}
      onClose={callbacks.closeModal}
      closeBtnTitle={select.locale.Close}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} totalTitle={select.locale.Total} />
    </ModalLayout>
  );
}

export default memo(Basket);
