import React, { memo, useCallback, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Item from '../../components/item';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import Spinner from '../../components/spinner';

function CatalogList() {
  const store = useStore();
  const { t, lang } = useTranslate();

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
  }));

  const { page, limit, sort, query } = select;

  useEffect(() => {
    store.actions.catalog.setParams({ page, limit, sort, query });
  }, [store.actions.catalog, page, limit, sort, query, lang]);

  const callbacks = {
    addToBasket: useCallback(
      _id => store.actions.basket.addToBasket(_id),
      [store]
    ),
    onPaginate: useCallback(
      newPage => store.actions.catalog.setParams({ page: newPage }),
      [store]
    ),
    makePaginatorLink: useCallback(
      p =>
        `?${new URLSearchParams({ page: p, limit, sort, query })}`,
      [limit, sort, query]
    ),
  };

  const renderItem = useCallback(
    item => (
      <Item
        item={item}
        onAdd={callbacks.addToBasket}
        link={`/articles/${item._id}`}
        labelAdd={t('article.add')}
        lang={lang}
      />
    ),
    [callbacks.addToBasket, t, lang]
  );

  return (
    <Spinner active={select.waiting}>
      <List list={select.list} renderItem={renderItem} />
      <Pagination
        count={select.count}
        page={select.page}
        limit={select.limit}
        onChange={callbacks.onPaginate}
        makeLink={callbacks.makePaginatorLink}
      />
    </Spinner>
  );
}

export default memo(CatalogList);
