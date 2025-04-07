import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

import { LANGUAGES } from '../../lang/languages';
import { PAGE_PATH } from '../../constants';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.currentLang,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return (
          <ItemBasket
            item={item}
            itemPageLink={`${PAGE_PATH.PRODUCT_PAGE}${item._id}`}
            onClose={callbacks.closeModal}
            onRemove={callbacks.removeFromBasket}
            title={LANGUAGES[select.lang].remove}
          />
        );
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={LANGUAGES[select.lang].basket} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} total={LANGUAGES[select.lang].total} />
    </ModalLayout>
  );
}

export default memo(Basket);
