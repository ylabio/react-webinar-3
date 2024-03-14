import { memo, useCallback, useMemo } from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PropTypes from 'prop-types';

function Basket({onClose}) {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentLanguage: state.localization.currentLanguage,
    uiElements: state.localization.uiElements,
  }));

  const modalLayoutUiElements = useMemo(() => {
    return {
      close: select.uiElements.modalClose[select.currentLanguage],
    };
  }, [select.currentLanguage, select.uiElements]);

  const itemBasketUiElements = useMemo(() => {
    return {
      remove: select.uiElements.basketRemove[select.currentLanguage],
      counter: select.uiElements.itemCounter[select.currentLanguage],
    }
  }, [select.currentLanguage, select.uiElements]);

  const basketTotalUiElements = useMemo(() => {
    return {
      title: select.uiElements.basketTitle[select.currentLanguage],
      total: select.uiElements.basketTotal[select.currentLanguage],
    }
  }, [select.currentLanguage, select.uiElements])

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    // closeModal: useCallback(() => store.actions.modals.close(), [store]),
    closeModal: onClose,
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return  <ItemBasket 
                item={item} 
                onRemove={callbacks.removeFromBasket} 
                link={`/articles/${item._id}`}
                uiElements={itemBasketUiElements}
              />
    }, [callbacks.removeFromBasket, itemBasketUiElements]),
  };

  return (
    <ModalLayout 
      title={basketTotalUiElements.title} 
      onClose={callbacks.closeModal}
      uiElements={modalLayoutUiElements}
    >
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} uiElements={basketTotalUiElements} />
    </ModalLayout>
  );
}

Basket.propTypes = {
  onClose: PropTypes.func,
};

Basket.defaultProps = {
  onClose: () => {},
};

export default memo(Basket);
