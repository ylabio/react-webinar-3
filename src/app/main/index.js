import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useNavigate } from 'react-router';

function Main() {
  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переход на страницу продукта
    navToProductPage: useCallback(_id => navigate(`/product/${_id}`), [navigate, store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} onNavigate={callbacks.navToProductPage} />;
      },
      [callbacks.addToBasket, callbacks.navToProductPage],
    ),
  };

  const postsPerPage = 10;
  console.log('Current List', select.list);
  // const currentPage = 1;
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // const totalPosts = select.count;
  const totalPosts = 511;
  console.log(totalPosts);
  const totalPages = 10;

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} totalPages={totalPages} />
    </PageLayout>
  );
}

export default memo(Main);
