import {memo, useCallback, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import {useDispatch, useSelector} from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import articleComments from '../../store-redux/comments/actions';
import {useSelector as useSelectorRedux} from 'react-redux';
import articleCommentsForm from '../../store-redux/comments/form/actions';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import ArticleComments from '../../containers/article-comments';


function Article() {
  const store = useStore();
  // const comments = useSelectorRedux(state => state.comments);

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(async () => {
    await Promise.all([
      //store.actions.article.load(params.id);
      //Загрузка описания товара
      dispatch(articleActions.load(params.id)),

      //Загрузка коменнтариев
      dispatch(articleComments.load(params.id)),

      //Сброс настроек формы
      dispatch(articleCommentsForm.closeForm()),
    ]);
   
  }, [params.id, articleCommentsForm.onSubmit]); 

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const selectRedux = useSelectorRedux(state => ({
    waiting: state.comments.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        {/* <LocaleSelect/> */}
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Spinner active={selectRedux.waiting}>
        <ArticleComments/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
