import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Basket() {
  const store = useStore()

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }))

  const selectLang = useSelector((state) => ({
    basketPageRu: state.lang.basketPageRu,
    basketPageEn: state.lang.basketPageEn,
    lang: state.lang.lang,
  }))

  const pageTitle = 
    selectLang.lang === 'ru'
      ? selectLang.basketPageRu.basket_page_title
      : selectLang.basketPageEn.basket_page_title

  const buttonDelete =
    selectLang.lang === 'ru'
      ? selectLang.basketPageRu.basket_page_button_delete
      : selectLang.basketPageEn.basket_page_button_delete

  const buttonCloseBasket =
    selectLang.lang === 'ru'
      ? selectLang.basketPageRu.basket_page_button_basket
      : selectLang.basketPageEn.basket_page_button_basket

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback(
      (item) => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            buttonItem={buttonDelete}/>)
      },[callbacks.removeFromBasket]),
  }

  return (
    <ModalLayout
      title={pageTitle}
      onClose={callbacks.closeModal}
      buttonClose={buttonCloseBasket}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  )
}

export default memo(Basket)
