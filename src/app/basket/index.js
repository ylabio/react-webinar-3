import { memo, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import BasketTotal from '../../components/basket-total';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { translations } from '../../utils/translations';

function Basket() {
  const store = useStore();
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.currentLanguage,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  useEffect(() => {
    const currentPathname = location.pathname;
    if (currentPathname !== prevPathname.current) {
      callbacks.closeModal();
      prevPathname.current = currentPathname;
    }
  }, [location.pathname, callbacks.closeModal]);

  const renders = {
    itemBasket: useCallback(
      item => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            buttonTitle={t.buttonRemove}
            itemLink={`items/${item._id}`}
          />
        );
      },
      [callbacks.removeFromBasket, select.lang],
    ),
  };

  const t = translations[select.lang] || translations.ru;

  return (
    <ModalLayout title={t.basket} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} totalText={t.total} />
    </ModalLayout>
  );
}

export default memo(Basket);
