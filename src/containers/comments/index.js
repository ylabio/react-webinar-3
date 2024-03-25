import {memo, useCallback, useMemo} from 'react';
import { useStore as useStoreRedux } from 'react-redux';
import { useSelector } from 'react-redux';
import useTranslate from '../../hooks/use-translate';
import CommentsList from '../../components/comments-list';
import Spinner from '../../components/spinner';
import CommentItem from '../../components/comment-item';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';

function Comments() {
  const store = useStoreRedux();

  const select = useSelector(state => ({
    data: state.comments?.data,
    count: state.comments?.count,
    article: state.article?.data,/*
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    count: state.catalog.count, */
    waiting: state.comments.waiting,
  }));

  /* const callbacks = {  // TODO!!! here should be comments redux actions
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Пагинация
    onPaginate: useCallback(page => store.actions.catalog.setParams({page}), [store]),
    // генератор ссылки для пагинатора
    makePaginatorLink: useCallback((page) => {
      return `?${new URLSearchParams({
        page,
        limit: select.limit,
        sort: select.sort,
        query: select.query
      })}`;
    }, [select.limit, select.sort, select.query])
  } */

  const {t} = useTranslate();

  const renders = {
    item: useCallback(item => (
      <CommentItem item={item} link={`/articles/${item._id}`}
            t={t}/>
    ), [t]),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentsList list={select.data} count={select.count} renderItem={renders.item} t={t}/>
    </Spinner>
  );
}

export default memo(Comments);
