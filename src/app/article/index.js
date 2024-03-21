import {memo, useCallback, useMemo} from 'react';
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
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
import LoginNav from '../../components/login-nav';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const navigate = useNavigate();
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    isLogin: state.login.isLogin,
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onLogout: useCallback(() => store.actions.login.logout(), [store]),
  }

  // useInit(() => {
  //   if(select.isLogin === true) store.actions.login.loginByToken();
  // }, [], true);

  const handleOnclick =()=>{
    navigate('/login');
    if(select.isLogin === true) callbacks.onLogout();
  }

  return (
    <PageLayout>
      <LoginNav onClick={handleOnclick}/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
