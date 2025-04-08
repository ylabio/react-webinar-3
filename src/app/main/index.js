import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import NotFound from '../../components/not-found';
import { useNavigate, useParams } from 'react-router';
import useTranslation from '../../store/lang/use-translat';
import { useLang } from '../../store/lang/language-context';

function Main() {
  const store = useStore();
  const { t } = useTranslation();
  const { lang, setLang } = useLang();

  const langContent = {
    header: t('header').mainTitle,
    nav: t('nav').main,
    load: t('loading'),
  };
  const langBasketTool = {
    baskeNav: t('nav').main,
    basketButton: t('button').basket,
    basketPlural: t('plural'),
  };
  const langItem = {
    button: t('button').add,
  };

  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const pathCurrentPage = pageNumber ? Number(pageNumber) : 1;
  const onMain = () => {
    navigate('/');
    callbacks.changePage(1);
  };
  const onPageNav = page => {
    const path = page === 1 ? '/' : `/page/${page}`;
    navigate(path);
  };

  const [initLoad, setInitLoad] = useState(true);

  const select = useSelector(state => ({
    list: state.catalog.list,
    error: state.catalog.error,
    isLoading: state.catalog.isLoading,
    totalItems: state.catalog.totalItems,
    currentPage: state.catalog.currentPage,
    limitItem: state.catalog.limitItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    if (initLoad) {
      store.actions.catalog.changePage(pathCurrentPage);

      store.actions.catalog.load(lang);
      setInitLoad(false);
    } else {
      store.actions.catalog.getFetch(select.limitItem, select.currentPage, lang);
    }
  }, [select.currentPage, select.limitItem, lang]);

  const totalPages = Math.ceil(select.totalItems / select.limitItem);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changePage: useCallback(number => store.actions.catalog.changePage(number), [store]),
    changeLimitItem: useCallback(number => store.actions.catalog.changeLimitItem(number), [store]),
    onNavigate: useCallback(
      event => {
        if (event.target.closest('li') && event.target.localName !== 'button') {
          navigate(`/article/${event.target.closest('li').dataset.id}`);
        }
      },
      [navigate],
    ),
  };
  const estimatedHeight = select.limitItem * 72.292;

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            onNavigate={callbacks.onNavigate}
            langContent={langItem}
          />
        );
      },
      [callbacks.addToBasket, callbacks.onNavigate, langItem],
    ),
  };

  if (select.error) return <NotFound />;

  return (
    <PageLayout>
      <Head title={langContent.header} setLang={setLang} lang={lang} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        langContent={{ ...langBasketTool, lang }}
        onMain={onMain}
      />
      {select.isLoading ? (
        <div style={{ minHeight: `${estimatedHeight}px` }}>
          <h2 style={{ margin: '0' }}>{langContent.load}</h2>
        </div>
      ) : (
        <List list={select.list} renderItem={renders.item} />
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={select.currentPage}
        onPageChange={callbacks.changePage}
        onLimitItem={callbacks.changeLimitItem}
        onNavigate={onPageNav}
      />
    </PageLayout>
  );
}

export default memo(Main);
