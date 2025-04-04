import { memo, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router";
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useAppContext } from '../../app-context';
import { generatePaginatedApiUrl, findNewPageNumber } from '../../utils';
import { BASE_URL, STRINGS } from '../../const';

// TODO: Проверить оптимизацию
function Main() {
  const store = useStore();
  const { currentPage } = useParams();
  const [limit, setLimit] = useState(10);
  const { setHeaderTitle, language } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    store.actions.catalog.load(generatePaginatedApiUrl(BASE_URL, currentPage, limit));
    setHeaderTitle(STRINGS.SHOP[language]);
  }, [currentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
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
    // Выбор количества отображаемых элементов на странице
    setLimit: useCallback((newLimit) => {
      const newPage = findNewPageNumber(currentPage, limit, newLimit);
      setLimit(newLimit);
      navigate(`/page/${newPage}`);
    }, [limit, setLimit, currentPage, navigate]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  // TODO: семантика
  return (
    <PageLayout>
      {select.isLoading ? 
        <div>Загрузка...</div>
        :
        <List list={select.list} renderItem={renders.item} />
       }
      <Pagination currentPage={currentPage} count={select.count} limit={limit} changeLimit={callbacks.setLimit} />
    </PageLayout>
  );
}

export default memo(Main);
