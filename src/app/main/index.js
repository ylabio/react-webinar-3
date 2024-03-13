import { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { langText } from '../../constants/language';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/bread-crumbs';
import Row from '../../components/row';

function Main({ language = 'ru' }) {
  const store = useStore();
  const { page } = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load(10, Number(page), language);
  }, [page, store.actions.catalog, language]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      _id => store.actions.basket.addToBasket(_id, language),
      [store, language],
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store],
    ),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} language={language} path={'/articles'}/>;
      },
      [callbacks.addToBasket, language],
    ),
  };

  return (
    <PageLayout>
      <Head title={langText.SHOP[language]} language={language} />
      <p>{}</p>
      <Row>
      <BreadCrumbs  path={'/'}>
        {langText.MAIN[language]}
      </BreadCrumbs>
        <BasketTool
          language={language}
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Row>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        limit={10}
        count={select.count}
        currentPage={Number(page) || 1}
      />
    </PageLayout>
  );
}

Main.propTypes = {
  language: PropTypes.string,
};

export default memo(Main);
