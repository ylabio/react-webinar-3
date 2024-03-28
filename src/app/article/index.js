import {memo, useCallback, useMemo,useState} from 'react';
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
import CommentForm from '../../components/comment-form';
import CommentItem from '../../components/comment-item';
import CommentsContainer from '../../containers/comments-list';

function Article() {
  const store = useStore();
  const dispatch = useDispatch();

  const params = useParams();
    const articleId = params.id;
  useInit(() => {
      dispatch(articleActions.load(articleId));
  }, [params.id]);


    const select = useSelector((state) => ({
        article: state.article.data,
        waitingArticle: state.article.waiting,
    }), shallowequal);

     

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
          <Spinner active={select.waitingArticle || select.waitingComments}>
              <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
              <CommentsContainer
              />
              {select.errorComments && <div>Error loading comments: {select.errorComments.message}</div>}
          </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
