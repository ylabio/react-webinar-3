import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { locale } from '../../locale';

function Basket() {

  const { lang } = useParams();

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
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} path={`/${lang}/article/`}
        onClose={callbacks.closeModal} lang={lang}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={locale[lang].basket.title} onClose={callbacks.closeModal} lang={lang}>
      <Suspense fallback={<div>Loading...</div>}>
        <List list={select.list} renderItem={renders.itemBasket}/>
      </Suspense>
      <BasketTotal sum={select.sum} lang={lang}/>
    </ModalLayout>
  );
}

export default memo(Basket);
