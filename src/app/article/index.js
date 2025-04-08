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
import { useLang } from '../../store/lang/language-context';

function Article() {
  const store = useStore();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { lang, setLang } = useLang();

  const onMain = () => {
    navigate('/');
    callbacks.onChangePage(1);
    callbacks.onChangeLimitItem(10);
  };

  useEffect(() => {
    if (userId) {
      callbacks.getFetchItemInfo(userId, lang);
    }
    if (select.activeModal) {
      callbacks.closeModal();
    }
  }, [userId, lang]);

  const select = useSelector(state => ({
    itemInfo: state.article.itemInfo,
    error: state.article.error,
    isLoading: state.article.isLoading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeModal: state.modals.name,
  }));
  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    getFetchItemInfo: useCallback(
      (id, lang) => store.actions.article.getFetchItemInfo(id, lang),
      [store],
    ),
    onChangePage: useCallback(number => store.actions.catalog.changePage(number), [store]),
    onChangeLimitItem: useCallback(
      number => store.actions.catalog.changeLimitItem(number),
      [store],
    ),
  };
  const currentId = select.itemInfo._id;
  const handleAddToBusket = () => callbacks.addToBasket(currentId);

  const { t } = useTranslation();
  const langContent = {
    button: t('button').add,
    load: t('loading'),
  };
  const langBasket = {
    baskeNav: t('nav').main,
    basketButton: t('button').basket,
    basketPlural: t('plural'),
  };
  const langItemInfo = {
    madeIn: t('itemInfo').madeIn,
    category: t('itemInfo').category,
    year: t('itemInfo').year,
    price: t('itemInfo').price,
  };

  if (select.error) return <NotFound />;

  return (
    <PageLayout>
      <Head title={select.itemInfo.title} setLang={setLang} lang={lang} />

      {select.isLoading ? (
        <h2>{langContent.load}</h2>
      ) : (
        <>
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
            langContent={{ ...langBasket, lang }}
            onMain={onMain}
          />
          <ItemInfo item={select.itemInfo} langContent={langItemInfo} />
          <Button title={langContent.button} style="primary" onClick={handleAddToBusket} />
        </>
      )}
    </PageLayout>
  );
}

export default memo(Article);
