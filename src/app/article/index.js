import {memo, useCallback, useEffect, useMemo, useState} from 'react';
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
import Comments from '../../components/comments';
import useSelector2 from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  const navigate = useNavigate();

  const {t, lang} = useTranslate();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id, lang]);

  const select = useSelector(state => ({
    article: state.article.data,
    waitingArticle: state.article.waiting,
    comments: state.comments.data,
    waitingComments: state.comments.waiting,
    //sendedComment: state.comments.data2,
    //waitingSendedComment: state.comments.waiting2,
    commentId: state.comments.commentId,
    newComment: state.comments.newComment
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  /*useEffect(() => {
    dispatch(commentsActions.load(params.id));
  }, [select.sendedComment]);*/

  /*useEffect(() => {
    console.log(select.waitingComments);
    if (!select.waitingComments) dispatch(commentsActions.load(params.id));
  }, [select.waitingComments])*/

  const select2 = useSelector2(state => ({
    user: state.session.user,
    exists: state.session.exists
  }))

  //const [commentId, setCommentId] = useState(null)

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onReply: useCallback(id => dispatch(commentsActions.setCommentId(id)), [commentsActions]),
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  }

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waitingArticle}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Spinner active={select.waitingComments}>
        <Comments comments={select.comments} onReply={callbacks.onReply} commentId={select.commentId} t={t}
          user={select2.user} exists={select2.exists} onSignIn={callbacks.onSignIn} article={select.article}
          newComment={select.newComment}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
