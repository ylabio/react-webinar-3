import { memo, useCallback, useContext } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useSelector from '../../store/use-selector';
import useStore from '../../hooks/use-store';
import { LanguageContext } from '../../store/context';

function Basket() {
  const store = useStore();
  const { translate, language } = useContext(LanguageContext);

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
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
            onRemove={callbacks.removeFromBasket}
            onCloseModal={callbacks.closeModal}
            language={language}
            title={translate('remove')}
            units={translate('pcs')}
          />
        );
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={translate('cart')} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} language={language} totalTitle={translate('total')} />
    </ModalLayout>
  );
}

export default memo(Basket);
