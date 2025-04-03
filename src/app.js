import React, { useEffect, useState } from 'react';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import List from './components/list';
import { cartButtonLabel } from './utils';
import { createHooks } from './hooks';
import RenderItem from "./components/item-render";
import { QueryApiClient } from "./api/api-query";
import { ArticleService } from "./api/api-articles";
import { ApiError } from "./api/api-error";
import { Store } from "./store";
import Pagination from "./components/pagination";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getStateList();
  const { cartList, sizeCart, total } = store.getCartState();
  const [show, setShow] = useState(false);
  const [AddedAnimation, setAddedAnimation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalItems, setTotalItems] = useState(0);

  const apiClient = new QueryApiClient('http://localhost:8010/api');
  const articleService = new ArticleService(apiClient);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const limit = 10;
        const skip = (currentPage - 1) * limit;
        const articles = await articleService.getArticleList(limit, skip);
        const totalItemsFromApi = await articleService.getTotalItems();
        setTotalItems(totalItemsFromApi);
        // Обновите состояние в store
        store.setState({
          ...store.getState(),
          list: articles.result.items,
        });
      } catch (error) {
        if (error instanceof ApiError) {
          console.error('Error fetching articles:', error);
        }
      }
    };
    fetchArticles();
  }, [currentPage]);

  const hooks = createHooks(store, setShow, setAddedAnimation);

  const cartBtnLabel = cartButtonLabel(sizeCart, total);

  return (
    <>
      <PageLayout nonScroll={show}>
        <Head title="Магазин" />
        <Controls label={cartBtnLabel} onShowCart={hooks.onShowCart} AddedAnimation={AddedAnimation} />
        <List list={list} renderItem={RenderItem} onClickAction={hooks.onAddCart} isCart={false} total={0} />
        <Pagination
          totalItems={totalItems}
          itemsPerPage={10}
          siblingCount={1}
          setCurrentPage={setCurrentPage}
        />
      </PageLayout>
      {show && (
        <Modal handleClose={hooks.onHideCart}>
          <List list={cartList} renderItem={RenderItem} onClickAction={hooks.onDeleteItem} isCart={true} total={total} />
        </Modal>
      )}
    </>
  );
}

export default App;
