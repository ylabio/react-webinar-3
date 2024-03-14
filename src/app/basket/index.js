import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {Link} from "react-router-dom";


function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    t: state.i18n.translations[state.i18n.lang],
    currentLang: state.i18n.lang,
    supportedLangs: state.i18n.supportedLangs
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      const itemLink = <Link to={`item/${item._id}`}>{item.title}</Link>
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} t={select.t} itemLink={itemLink}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={select.t.cart} onClose={callbacks.closeModal} t={select.t}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} t={select.t}/>
    </ModalLayout>
  );
}

export default memo(Basket);
