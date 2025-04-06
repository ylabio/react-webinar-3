import { memo, useCallback, useEffect, useState } from 'react';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import Button from '../../components/button';
import ItemInfo from '../../components/item-info';
import { useNavigate, useParams } from 'react-router';
import NotFound from '../../components/not-found';
import useTranslation from '../../store/lang/use-translat';

function Article() {
  const store = useStore();
  const navigate = useNavigate();
  const { userId } = useParams();
  const onMain = () => {
    navigate('/');
    callbacks.onChangePage(1);
    callbacks.onChangeLimitItem(10);
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
    onChangeLimitItem: useCallback(
      number => store.actions.pagination.changeLimitItem(number),
      [store],
    ),
  };
  const currentId = select.itemInfo._id;
  const handleAddToBusket = () => callbacks.addToBasket(currentId);

  const { t } = useTranslation();
  const langContent = {
    nav: t('nav').main,
    button: t('button').add,
    load: t('loading'),
  };

  if (select.error) return <NotFound />;

  return (
    <PageLayout>
      <Head title={select.itemInfo.title} />

      {select.isLoading ? (
        <h2>{langContent.load}</h2>
      ) : (
        <>
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
            main={langContent.nav}
            onMain={onMain}
          />
          <ItemInfo item={select.itemInfo} />
          <Button title={langContent.button} style="primary" onClick={handleAddToBusket} />
        </>
      )}
    </PageLayout>
  );
}

export default memo(Article);
