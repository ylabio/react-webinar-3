import {memo, useCallback} from 'react';
import {useDispatch, useStore as useStoreRedux} from 'react-redux';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import useTranslateI18n from '../../hooks/use-translate-i18n';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import modalsActions from '../../store-redux/modals/actions';


function Basket() {

  const store = useStore();
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      //store.actions.modals.close();
      dispatch(modalsActions.close());
    }, [store]),
  }

  // const {t} = useTranslate();

  const {translate} = useTranslateI18n();

  const renders = {
    itemBasket: useCallback((item) => (
      <ItemBasket item={item}
                  link={`/articles/${item._id}`}
                  onRemove={callbacks.removeFromBasket}
                  onLink={callbacks.closeModal}
                  labelUnit={translate('basket.unit')}
                  labelDelete={translate('basket.delete')}
      />
    ), [callbacks.removeFromBasket, translate]),
  };

  return (
    <ModalLayout title={translate('basket.title')} labelClose={translate('basket.close')}
                 onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} translate={translate}/>
    </ModalLayout>
  );
}

export default memo(Basket);
