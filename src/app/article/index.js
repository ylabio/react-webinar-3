import {memo, useCallback, useMemo} from 'react';
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
import treeToList from '../../utils/tree-to-list/index';
import listToTree from '../../utils/list-to-tree/index';
import dateFormat from '../../utils/date-format';
import ArticleComments from '../../containers/article-comments';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();
  const {t, lang} = useTranslate();

  useInit(() => {
    //store.actions.article.load(params.id);
    Promise.all([
      dispatch(articleActions.load(params.id)),
      dispatch(commentsActions.load(params.id))
    ])
  }, [params.id, lang]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data,
    commentsWaiting: state.comments.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  const comments = useMemo(() => [
      ...treeToList(listToTree(select.comments)[0]?.children ?? [], (item, level) => (
        {...item, data: dateFormat(item.dateCreate, lang), level}
      ))
    ], [select.comments, lang]);

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
      <Spinner active={select.commentsWaiting}>
        <ArticleComments comments={comments} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
