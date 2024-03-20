import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayoutMain from "../../containers/modal-layout-main";
import BasketTotal from "../../components/basket-total";
import ScrollBarMain from "../../containers/scrollbar-main";


/**
 * Корзина в модальном окне
 */
function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      document.body.style.overflow = "auto";
      store.actions.modals.close();
    }, [store]),
  }

  const {t} = useTranslate();

  const renders = {
    itemBasket: useCallback((item) => (
      <ItemBasket item={item}
                  link={`/articles/${item._id}`}
                  onRemove={callbacks.removeFromBasket}
                  onLink={callbacks.closeModal}
                  labelUnit={t('basket.unit')}
                  labelDelete={t('basket.delete')}
      />
    ), [callbacks.removeFromBasket, t]),
  };

  return (
    <ModalLayoutMain title={t('basket.title')} labelClose={t('basket.close')}
                 onClose={callbacks.closeModal}>
      <ScrollBarMain>
        <List list={select.list} renderItem={renders.itemBasket}/>
      </ScrollBarMain>
      <BasketTotal sum={select.sum} t={t}/>
    </ModalLayoutMain>
  );
}

export default memo(Basket);
