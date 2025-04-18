import { memo, useCallback } from 'react';
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
import HeadLayout from '../../components/head-layout';
import CommentsSection from '../../containers/comments-section';
import commentsActions from '../../store-redux/comments/actions';

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  const params = useParams();
  const { locale, t } = useTranslate();

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id, locale]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
    }),
    shallowequal,
  );

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  return (
    <>
      <HeadLayout>
        <TopHead />
      </HeadLayout>
      <Head title={select.article?.title || '...'}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          {select.article && select.article._id && (
            <>
              <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
              <CommentsSection articleId={select.article._id} />
            </>
          )}
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Article);
