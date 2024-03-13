import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useTranslate} from '../../translate'
import { url } from '../../url';
import { Link } from 'react-router-dom';

function Basket() {

  const store = useStore();
const {translate}=useTranslate();
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
      return  <ItemBasket url={url.product} item={item} onRemove={callbacks.removeFromBasket}>
        <Link to={url.product+item._id} onClick={callbacks.closeModal}> {item.title}
      </Link>  </ItemBasket>
    }, [callbacks]),
  };

  return (
    <ModalLayout url={url.main} title={translate('inTheBasket')} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal  sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
