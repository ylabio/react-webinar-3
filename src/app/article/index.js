import { memo, useCallback, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import HeadLayout from '../../components/head-layout';
import CommentsList from '../../components/comments-list';
import treeToListComments from '../../utils/tree-to-list-comments';
import useSelectorPrev from '../../hooks/use-selector';

function Article() {
  const store = useStore();
  const [commentsList, setCommentsList] = useState(undefined);
  const [articleComment, setArticleComment] = useState('');

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.loadComments(params.id));
  }, [params.id]);

  const select = useSelector(
    state => ({
      comments: state.comments.comments,
      article: state.article.data,
      waiting: state.article.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t, lang } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Отслеживание вводимого текста
    onChange: useCallback(value => setArticleComment(value), [setArticleComment]),
    // Добавить комментарий
    onAddComment: useCallback(() => {
      dispatch(commentsActions.addComment(articleComment, params.id, "article", params.id));
      setTimeout(() => {
        dispatch(commentsActions.loadComments(params.id));
      }, 500);
    
      setArticleComment('');
    }, [dispatch, articleComment, params.id]),
    // Добавить ответ
    onAddAnswer: useCallback((id) => {
      dispatch(commentsActions.addComment(articleComment, id, "comment", params.id));
      setTimeout(() => {
        dispatch(commentsActions.loadComments(params.id));
      }, 500);
    
      setArticleComment('');
    }, [dispatch, articleComment, params.id]),
  };
  
  useEffect(() => {
    if (select.comments.items) {
      setCommentsList(treeToListComments(listToTree(select.comments.items)[0].children))
    }
  }, [select.comments.count]);

  useEffect(() => {
    dispatch(articleActions.load(params.id));
  }, [lang]);

  const user = useSelectorPrev(state => ({user: state.session.user}))

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
          <CommentsList
            t={t}
            count={select.comments.count}
            user={user.user}
            list={commentsList}
            value={articleComment}
            onChange={callbacks.onChange}
            onClick={callbacks.onAddComment}
            onClickAnswer={callbacks.onAddAnswer}
          />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Article);
