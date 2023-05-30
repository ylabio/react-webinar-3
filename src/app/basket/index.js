import { memo, useCallback } from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { LanguageList } from '../../lang';

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const translate = (elem) => LanguageList[select.language][elem]

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} link={`/card/${item._id}`} onRemove={callbacks.removeFromBasket}
        buttonName={translate('delete')} count={translate('count')} />
    }, [callbacks.removeFromBasket, select.language]),
  };

  return (
    <ModalLayout title={translate('basket')} buttonName={translate('close')} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} total={translate('total')} />
    </ModalLayout>
  );
}

export default memo(Basket);
