import { memo, useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import ArticleCommentList from '../../components/article-comment-list';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import HeadLayout from '../../components/head-layout';

function Article() {
  const store = useStore();
  const { id: articleId } = useParams();
  const [activeForm, setActiveForm] = useState(null);
  const dispatch = useDispatch();

  // Сессия и статья
  const { data: article, waiting: articleWaiting } = useSelector(
    state => state.article,
    shallowEqual
  );


  const { exists } = useSelector(state => state.session);
  const rootComments = useSelector(state =>
    state.comments.items[articleId] || []
  );

  // Загрузка данных
  useInit(() => {
    dispatch(articleActions.load(articleId));
    dispatch(commentsActions.load(articleId)); // Убрали проверку sessionWaiting
  }, [articleId]);
  console.log('useSelector Article', useSelector(state => state));

  const handleAddComment = async (parentId, parentType, text) => {
    try {
      await dispatch(commentsActions.add(parentId, parentType, text));
      setActiveForm(null);
    } catch (e) {
      console.error('Ошибка добавления комментария:', e);
    }
  };

  const { t } = useTranslate();

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  return (
    <>
      <HeadLayout>
        <TopHead />
      </HeadLayout>
      <Head title={article.title}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={articleWaiting}>
          <ArticleCard article={article} onAdd={callbacks.addToBasket} t={t} />
          <ArticleCommentList
            articleId={articleId}
            comments={rootComments}
            onAddComment={handleAddComment}
            activeForm={activeForm}
            setActiveForm={setActiveForm}
            isAuth={exists}
          />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Article);
