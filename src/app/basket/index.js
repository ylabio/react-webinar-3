import {memo, useCallback} from 'react';
import {useDispatch, useStore as useStoreRedux} from 'react-redux';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import modalsActions from '../../store-redux/modals/actions';

function Basket() {

  const store = useStore();
  const dispatch = useDispatch();
  const {translateService, locale} = useTranslate();

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

  const renders = {
    itemBasket: useCallback((item) => (
      <ItemBasket item={item}
                  link={`/articles/${item._id}`}
                  onRemove={callbacks.removeFromBasket}
                  onLink={callbacks.closeModal}
                  labelUnit={translateService.translate('basket.unit')}
                  labelDelete={translateService.translate('basket.delete')}
      />
    ), [callbacks.removeFromBasket, locale]),
  };

  return (
    <ModalLayout title={translateService.translate('basket.title')} labelClose={translateService.translate('basket.close')}
                 onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} t={translateService}/>
    </ModalLayout>
  );
}

export default memo(Basket);
