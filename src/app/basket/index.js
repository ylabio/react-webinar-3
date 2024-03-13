import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { locale } from '../../locale';

function Basket({lang}) {

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
     // Обновление страницы текущего товара, закрытие модалки
    setItemPage: useCallback(_id => store.actions.catalog.setCurrentItem(_id), [store])
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} lang={lang} link={`/item/${item._id}`}
      onRemove={callbacks.removeFromBasket}
      onFollowing={callbacks.setItemPage}
      onClose={callbacks.closeModal} />
    }, [callbacks.removeFromBasket, lang]),
  };

  return (
    <ModalLayout title={locale[lang].head.cart} onClose={callbacks.closeModal} lang={lang}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} lang={lang}/>
    </ModalLayout>
  );
}

export default memo(Basket);
