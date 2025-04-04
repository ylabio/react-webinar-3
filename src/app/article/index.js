import { memo, useCallback, useEffect, useState } from 'react';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import Button from '../../components/button';
import ItemInfo from '../../components/article-item';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from '../../hooks/useTranslation';

function Article() {
  const store = useStore();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { t } = useTranslation();
  
  const onMain = () => {
    navigate('/');
    callbacks.onChangePage(1);
  };

  useEffect(() => {
    if (userId) {
      callbacks.getFetchItemInfo(userId);
    }
  }, [userId]);

  const select = useSelector(state => ({
    itemInfo: state.article.itemInfo,
    error: state.article.error,
    isLoading: state.article.isLoading,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    getFetchItemInfo: useCallback(id => store.actions.article.getFetchItemInfo(id), [store]),
    onChangePage: useCallback(number => store.actions.pagination.changePage(number), [store]),
  };
  const currentId = select.itemInfo._id;
  const handleAddToBusket = () => callbacks.addToBasket(currentId);

  if (select.error) return <div>Error occurred</div>;

  return (
    <PageLayout>
      <Head title={select.itemInfo.title} />

      {select.isLoading ? (
        <h2>{t('loading')}</h2>
      ) : (
        <>
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
            main="main"
            onMain={onMain}
          />
          <ItemInfo item={select.itemInfo} />
          <Button title="btn-add" style="primary" onClick={handleAddToBusket} />
        </>
      )}
    </PageLayout>
  );
}

export default memo(Article);