import {memo, useCallback} from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import {language} from '../../language';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.type,
    langModalLayout: language.modalLayout,
    langButtonRemove: language.itemBasket.buttonRemove,
    langTotal: language.basketTotal.total,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return (
        <ItemBasket item={item} onRemove={callbacks.removeFromBasket} link={`/card/${item._id}`}
                    buttonRemove={select.langButtonRemove[select.language]} 
                    closeModal={callbacks.closeModal}/>
      );
    }, [callbacks.removeFromBasket, select.langButtonRemove[select.language]]),
  };

  return (
    <ModalLayout multilingualText={select.langModalLayout} 
                  language={select.language} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} total={select.langTotal[select.language]}/>
    </ModalLayout>
  );
}

export default memo(Basket);
