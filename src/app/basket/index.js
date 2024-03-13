import {memo, useCallback} from 'react';
import {Link} from 'react-router-dom';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useLanguage} from '../../localization/language-context'
import texts from '../../localization/texts';

function Basket() {

  const store = useStore();
  const {language} = useLanguage();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} language={texts[language]}
                link={<Link to={`/info/${item._id}`} onClick={callbacks.closeModal}>{item.title}</Link>}/>
    }, [callbacks.removeFromBasket, callbacks.closeModal, language]),
  };

  return (
    <ModalLayout title={texts[language].basket} onClose={callbacks.closeModal} language={texts[language]}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} language={texts[language]}/>
    </ModalLayout>
  );
}

export default memo(Basket);
