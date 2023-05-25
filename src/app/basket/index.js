import { memo, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import BasketTotal from "../../components/basket/basket-total";
import ItemBasket from "../../components/items/item-basket";
import ModalLayout from "../../components/layouts/modal-layout";
import List from "../../components/list";
import useLanguage from '../../localization/use-language';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Basket() {

  const navigate = useNavigate();
  const ln = useLanguage();
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store])
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item}
        onRemove={callbacks.removeFromBasket}
        url={`article/${item._id}`}
        onLinkClick={callbacks.closeModal}
      />
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={ln('basketLabel')} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
