import {memo, useCallback,useContext} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { LanguagesContext } from '../../components/languageSwitcher';
function Basket() {

  const store = useStore();
  const {langData} = useContext(LanguagesContext);
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
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket}  langData={langData}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={langData.basket.title} onClose={callbacks.closeModal}  langData={langData}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} langData={langData}/>
    </ModalLayout>
  );
}

export default memo(Basket);
