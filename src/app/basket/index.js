import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import modalsActions from '../../store-redux/modals/actions';

function Basket() {
  const store = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, lang } = useTranslate();

  const { list: basketItems, sum, amount } = useSelector(state => state.basket);

  const [itemsCache, setItemsCache] = useState({});

  const updateItemsCache = useCallback(async () => {
    const newItems = basketItems.filter(item => !itemsCache[item._id]);
    if (newItems.length === 0) return;

    const updates = await store.services.api.fetchItemsDetails(newItems);
    setItemsCache(prev => ({ ...prev, ...updates }));
  }, [basketItems, itemsCache, store.services.api]);

  useEffect(() => {
    updateItemsCache();
  }, [basketItems, lang, updateItemsCache]);

  const resolvedItems = basketItems.map(item => ({
    ...item,
    ...(itemsCache[item._id] || {}),
  }));

  const callbacks = {
    removeFromBasket: useCallback(_id => {
      store.actions.basket.removeFromBasket(_id);
      setItemsCache(prev => {
        const newCache = { ...prev };
        delete newCache[_id];
        return newCache;
      });
    }, [store.actions.basket]),

    closeModal: useCallback(() => dispatch(modalsActions.close()), [dispatch]),
    
    navigateToArticle: useCallback((id) => {
      dispatch(modalsActions.close());
      navigate(`/articles/${id}`);
    }, [dispatch, navigate]),
  };

  return (
    <ModalLayout
      title={t('basket.title')}
      labelClose={t('basket.close')}
      onClose={callbacks.closeModal}
    >
      <List
        list={resolvedItems} 
        renderItem={item => (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            onNavigate={() => callbacks.navigateToArticle(item._id)}
            labelUnit={t('basket.unit')}
            labelDelete={t('basket.delete')}
          />
        )}
      />
      <BasketTotal sum={sum} t={t} />
    </ModalLayout>
  );
}

export default memo(Basket);
