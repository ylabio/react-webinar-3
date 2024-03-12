import { memo, useCallback, useContext } from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { localeContext } from '../../store/locale-context';
import { useLocale } from '../../store/use-locale';

function Basket() {

  const store = useStore();
  const { locale } = useContext(localeContext)
  const localeDict = useLocale()
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
      return <ItemBasket localeDict={localeDict} toPath={{
        pathname: '../product',
        search: `?id=${item._id}`,
      }} item={item} onRemove={callbacks.removeFromBasket} />
    }, [callbacks.removeFromBasket, locale]),
  };

  return (
    <ModalLayout localeDict={localeDict} title={localeDict.cart} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} localeDict={localeDict} />
    </ModalLayout>
  );
}

export default memo(Basket);
