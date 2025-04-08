import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useNavigate } from "react-router";
import { useDictionary } from "../../translations/useDictionary";
import { useLabels } from '../../translations/useLabels';

function Basket() {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const {labelBasket} = useLabels();
  const {lang} = useDictionary();

  const {total: totalBasketsLabels, title: titleModalsLabel, ...itemBasketsLabels} = labelBasket;

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        const {title, ...rest} = item;
        const itemWithCurrentLangTitle = {...rest, title: title[lang]};
        return <ItemBasket item={itemWithCurrentLangTitle}
                           onRemove={callbacks.removeFromBasket}
                           link={`/${lang}/article/${item._id}`}
                           labels={itemBasketsLabels}
                           onClose={callbacks.closeModal}/>;
      },
      [callbacks.removeFromBasket, lang],
    ),
  };

  return (
    <ModalLayout title={titleModalsLabel} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} label={totalBasketsLabels}/>
    </ModalLayout>
  );
}

export default memo(Basket);
