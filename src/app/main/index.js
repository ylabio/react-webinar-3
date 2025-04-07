import { memo, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router";
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useAppContext } from '../../app-context';
import { generatePaginatedApiUrl, findNewPageNumber } from '../../utils';
import { BASE_URL, STRINGS, DEFAULT_LIMIT } from '../../const';

function Main() {
  const store = useStore();
  const { currentPage } = useParams();
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const language = useSelector(state => state.catalog.language);
  const navigate = useNavigate();

  useEffect(() => {
    store.actions.catalog.load(generatePaginatedApiUrl(BASE_URL, currentPage, limit));
    // setHeaderTitle(STRINGS.SHOP[language]);
  }, [currentPage]);

  useEffect(() => {
    if (+currentPage === 1) {
      store.actions.catalog.load(generatePaginatedApiUrl(BASE_URL, currentPage, limit));
    }
  }, [limit]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoading: state.catalog.isLoading,
  }));

  useEffect(() => {
    if (select.list.length === 0 && select.count > 0) {
      navigate(`/page/${Math.ceil(select.count / limit)}`);
    }
  }, [select]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onChangeLanguage: useCallback(() => store.actions.catalog.changeLanguage(), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Выбор количества отображаемых элементов на странице
    setLimit: useCallback((newLimit) => {
      const newPage = findNewPageNumber(currentPage, limit, newLimit);
      setLimit(newLimit);
      navigate(`/page/${newPage}`);
    }, [limit, setLimit, currentPage, navigate]),
    // смена языка
    onChangeLanguage: useCallback(() => store.actions.catalog.changeLanguage(), [store]),
  };

  const texts = {
    addButtonText: STRINGS.ADD[language],
    title: STRINGS.SHOP[language],
    switchLanguage: STRINGS.SWITCH_LANGUAGE[language],
    home: STRINGS.HOME[language],
    empty: STRINGS.EMPTY[language],
    products: STRINGS.PRODUCTS[language],
    select: STRINGS.SELECT[language],
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} texts={texts}/>;
      },
      [callbacks.addToBasket, texts],
    ),
  };

  // @todo 
  return (
    <PageLayout>
      <Head
        title={texts.title}
        changeLanguage={callbacks.onChangeLanguage}
        switchLanguage={texts.switchLanguage}
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        home={texts.home}
        empty={texts.empty}
        products={texts.products}
        language={language}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={currentPage}
        count={select.count}
        limit={limit}
        changeLimit={callbacks.setLimit}
        texts={texts.select}
      />
    </PageLayout>
  );
}

export default memo(Main);
