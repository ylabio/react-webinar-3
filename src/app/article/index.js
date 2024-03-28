import {memo, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
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
import Comments from "../../containers/comments";

function Article() {
  const store = useStore();
  const params = useParams();
  const dispatch = useDispatch();
  const {t, lang} = useTranslate();

  useInit(() => {
    dispatch(articleActions.load(params.id));
  }, [params.id, lang]);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

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
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Comments/>
    </PageLayout>
  );
}

export default memo(Article);
