import {memo, useCallback, useState} from 'react';
import {useParams} from 'react-router-dom';
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
import commentsActions from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentsList from '../../components/comments-list';
import CreateComment from '../../containers/create-comment';
import Comment from '../../components/comment';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  const [currentCommentId, setCurrentCommentId] = useState(params.id);

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    comments: state.comments.comments,
    countComments: state.comments.count,
    waiting: state.article.waiting,
    waitingComments: state.comments.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  const renders = {
    comment: useCallback(comment => (
      <Comment comment={comment}/>
    ), [t]),
  };

  const list = {
    comments: [
      ...treeToList(listToTree(select.comments), (item, level) => (
        {...item, space: 30*(level - 1)}
      ))
    ],
  }
  list.comments.shift();

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
      <Spinner active={select.waitingComments}>
        <CommentsList
          comments={list.comments}
          renderComment={renders.comment}
          countComments={select.countComments}
          currentCommentId={currentCommentId}
          setCurrentCommentId={setCurrentCommentId}
          articleId={params.id}
        />
      </Spinner>
      {params.id === currentCommentId &&
        <CreateComment
          title='Новый комментарий'
          isComment={false}
          setCurrentCommentId={setCurrentCommentId}
          currentCommentId={currentCommentId}
          articleId={params.id}
          parentType='article'
      />}
    </PageLayout>
  );
}

export default memo(Article);
