import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { langText } from '../../constants/language';

function Basket({ language = 'ru' }) {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      _id => store.actions.basket.removeFromBasket(_id),
      [store],
    ),
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
            language={language}
            path={'/articles'}
          />
        );
      },
      [callbacks.removeFromBasket, language],
    ),
  };

  return (
    <ModalLayout
      title={langText.SHOPPING_CART[language][0]}
      onClose={callbacks.closeModal}
      language={language}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} language={language}/>
    </ModalLayout>
  );
}

Basket.propTypes = {
  language: PropTypes.string,
};

export default memo(Basket);
