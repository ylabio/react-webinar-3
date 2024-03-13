import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import translate from '../../store/language/use-translate';

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
		lang: state.language.language,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} 
												 onRemove={callbacks.removeFromBasket} 
												 link={`/card/${item._id}`} 
												 onCloseModal={callbacks.closeModal}
												 translation={translate(select.lang)}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={translate(select.lang).titles.cart} onClose={callbacks.closeModal} translation={translate(select.lang).actions.close}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} translation={translate(select.lang).total}/>
    </ModalLayout>
  );
}

export default memo(Basket);
