import { memo, useCallback, useEffect } from "react";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useNavigate } from "react-router-dom";
import { useTranslate } from '../../language/lang-conext';



function Basket() {
  const store = useStore();
  const navigate = useNavigate();

  const t= useTranslate();
  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    onLink: useCallback(_id => { 
      navigate(`articles/${_id}`);
      callbacks.closeModal();
      }, [store]),
  };

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} onLink={callbacks.onLink} texts={{delete:t("links.delete"), pcs:t("links.pcs") }}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={t("basket.title")} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} totalTitle={t("links.open")}/>
    </ModalLayout>
  );
}

export default memo(Basket);
