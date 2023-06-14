import { memo, useCallback, useMemo } from 'react';
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import CommentsPart from '../../containers/comments-part';
import CommentsError from '../../components/comments-error';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from "shallowequal";
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';


function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();

  const multilang = useTranslate()

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
    dispatch(commentsActions.setAnswerId(params.id))
  }, [params.id, multilang]);

  const selectRedux = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    errors: state.comments.errors
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <TopHead />
      <Head title={selectRedux.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={selectRedux.waiting}>
        <ArticleCard article={selectRedux.article} onAdd={callbacks.addToBasket} multilang={multilang} />
      </Spinner>
      {!selectRedux.errors ? <CommentsPart /> : <CommentsError error={selectRedux.errors} t={t} />}
    </PageLayout>
  );
}

export default memo(Article);
