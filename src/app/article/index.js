import { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentActions from '../../store-redux/comment/actions';
import HeadLayout from '../../components/head-layout';
import Comment from '../../components/comment';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import useSelector from '../../hooks/use-selector';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  const { t, lang } = useTranslate();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentActions.load(params.id));
  }, [params.id, lang]);

  const select = useSelectorRedux(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const selectComment = useSelectorRedux(
    state => ({
      comment: state.comment.data,
      postRes: state.comment.postRes,
      waitingComment: state.comment.waiting,
    }),
    shallowequal,
  );

  const selectUser = useSelector(state => ({
    user: state.session.user,
  }));

  const commentList = useMemo(() => {
    if (!selectComment.waitingComment) {
      return [
        ...treeToList(listToTree(selectComment.comment.items, '_id', 'article'), (item, level) => ({
          ...item,
          level: level,
        })),
      ];
    } else return [];
  }, [selectComment.comment, selectComment.postRes]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  return (
    <>
      <HeadLayout>
        <TopHead />
      </HeadLayout>
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
          <Comment count={selectComment.comment.count} comments={commentList} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Article);
