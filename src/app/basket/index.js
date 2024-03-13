import {memo, useCallback, useContext} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {LanguageContext} from "../../language-provider.js";
import {useNavigate} from "react-router";

function Basket(callback, deps) {

  const store = useStore();
  const navigate = useNavigate();

  const { wordsTranslate } = useContext(LanguageContext);

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
    onNavigate: useCallback((id) => navigate(`/articles/${id}`), [])
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} link={item._id} onClose={callbacks.closeModal}  onNavigate={callbacks.onNavigate} onRemove={callbacks.removeFromBasket}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={wordsTranslate("basket")} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
