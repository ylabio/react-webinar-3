import {memo, useCallback, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import CommentItem from '../../components/comment-item'
import CommentsBlock from '../../components/comments-block'
import Item from '../../components/item'
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import {useDispatch, useSelector} from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions'
import useSelectorStore from '../../hooks/use-selector'
import { filterListByParent } from '../../utils/filter-list-by-parent'

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id))
  }, [params.id]);

  const { token, exists } = useSelectorStore(state => state.session)

  const select = useSelector(state => ({
    article: state.article.data,
    comments: state.comments.data,
    waiting: state.article.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const {t} = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    sendComment: useCallback((data) => {
      dispatch(commentsActions.sendComment(data, token)
    )}, [token, params.id])
  }

  const renders = {
    item: useCallback(item => (
      <CommentItem item={item} exists={exists}/>
    ), [t]),
  };

  const options = {
    comments: select.comments.items && filterListByParent(select.comments.items, params.id)
  }

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Spinner active={select.waiting}>
        <CommentsBlock
          count={select.comments.count}
          articleId={params.id}
          items={options.comments}
          renderItem={renders.item}
          exists={exists}
          sendComment={callbacks.sendComment}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
