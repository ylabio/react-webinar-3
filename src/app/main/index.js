import {memo, useCallback, useEffect, useState} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PaginationControls from "../../components/pagination-controls";
import ControlsPanel from "../../components/controls-panel";
import {useLocation, useNavigate, useSearchParams} from "react-router";
import MainLink from "../../components/main-link";
import {useDictionary} from "../translations/useDictionary";

function Main() {
  console.log('перерендер')
  const { t } = useDictionary();
  const store = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const lang = location.pathname.split('/')[1] || 'ru';
  const page = Number(searchParams.get('page'));
  const pageSize = Number(searchParams.get('pageSize'));
  const navigate = useNavigate();
  console.log('page', page, 'pageSize', pageSize);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.totalPages,
    currentPage: state.catalog.currentPage,
    skip: state.catalog.skip,
    pageSize: state.catalog.pageSize,
  }));

  useEffect(() => {
    if (page === 0 || pageSize === 0) {
      store.actions.catalog.load({page:1, pageSize:10, lang});
    } else if (!page || page < 1) {
      setSearchParams({ page: '1', pageSize: pageSize})
    } else if (![5, 10, 20].includes(pageSize)) {
      setSearchParams({ page: page, pageSize: '10' })
    } else {
      store.actions.catalog.load({page, pageSize, lang});
    }
  }, [page, pageSize, lang]);



/*  useEffect(() => {
    if (page > select.totalPages) {
      setSearchParams({ page: select.totalPages, pageSize: select.pageSize })
    }
  }, [page]);*/

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    handlePageChange: useCallback(
      ({ newLimit, oldLimit, oldPage }) => {
        const oldSkip = (oldPage - 1) * oldLimit;
        const newPage = Math.floor(oldSkip / newLimit) + 1;

        const lang = location.pathname.split('/')[1] || 'ru';

        // Обновляем весь URL, включая язык и query
        navigate({
          pathname: `/${lang}`,
          search: `?page=${newPage}&pageSize=${newLimit}`,
        });
      },
      [navigate, location]
    ),
  };

  const renders = {
    item: useCallback(
      item => {
        const lang = location.pathname.split('/')[1] || 'ru';
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            link={`/${lang}/article/${item._id}`}
          />
        );
      },
      [callbacks.addToBasket, location]
    ),
  };

  return (
    <PageLayout>
      <Head title={t('store')}/>
      <ControlsPanel>
        <MainLink/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </ControlsPanel>

      <List list={select.list} renderItem={renders.item}/>

      <PaginationControls totalPages={select.totalPages}
                          currentPage={select.currentPage}
                          pageSize={select.pageSize}
      onLimitChange={callbacks.handlePageChange}/>
    </PageLayout>
  );
}

export default memo(Main);
