import {memo, useCallback, useContext} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {TextDataContext} from '../../contexts';
import {APP_PATHS} from '../../constants';

function Basket() {

  const textData = useContext(TextDataContext);

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
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item}
                         onRemove={callbacks.removeFromBasket}
                         onCloseModal={callbacks.closeModal}
                         linkUrl={APP_PATHS.PRODUCT + item._id}
                         textData={textData.basketProduct}
              />
    }, [callbacks.removeFromBasket, textData]),
  };

  return (
    <ModalLayout textData={textData.modalBasket} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} textData={textData.basketTotal}/>
    </ModalLayout>
  );
}

export default memo(Basket);
