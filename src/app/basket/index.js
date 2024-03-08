import { memo, useCallback, useMemo } from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import translate from "../../translation/translation";

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} link={`/card/${item._id}`} onCloseModal={callbacks.closeModal} language={languageViewData.language}/>
    }, [callbacks.removeFromBasket]),
  };

  const languageViewData = {
    language: useMemo(() =>  translate(select.language), [select.language])
  }

  return (
    <ModalLayout title={languageViewData.language.menu.title} onClose={callbacks.closeModal} language={languageViewData.language.menu.close}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} language={languageViewData.language.menu.total}/>
    </ModalLayout>
  );
}

export default memo(Basket);
