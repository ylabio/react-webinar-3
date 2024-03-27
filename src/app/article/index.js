import {memo, useCallback, useMemo} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import articleCommentsActions from '../../store-redux/article-comments/actions';
import ArticleComments from '../../components/article-comments';

function Article() {
  const store = useStore();
  const location = useLocation()

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  const {t, lang} = useTranslate();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
  }, [params.id, lang]);
  
  useInit(() => {
    dispatch(articleCommentsActions.load(params.id))
  }, [params.id])

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.articleComments.data,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const storeSelect = useSelector(state => ({
    exists: state.session.exists,
    loggedUser: state.session.user,
  })) 
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    addComment: (formData) => {
      const currentUserName =  storeSelect.loggedUser.profile?.name
      dispatch(articleCommentsActions.addComment(formData, currentUserName))
    }
  }

  const commentParent = {
    _id: select.article._id,
    _type: select.article._type,
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
        <ArticleComments 
          comments={select.comments}
          isLoggedIn={storeSelect.exists} 
          loggedUserId={storeSelect.loggedUser._id}
          pathname={location.pathname}
          commentParent={commentParent}
          onAddComment={callbacks.addComment}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
