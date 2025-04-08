import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import { useLocation, useNavigate, useParams } from "react-router";
import ControlsPanel from "../../components/controls-panel";
import useSelector from "../../store/use-selector";
import HomeLink from "../../components/home-link";
import { useDictionary } from '../../translations/useDictionary';
import { useHomeLink } from '../../hooks/useHomeLink';
import { useLabels } from '../../translations/useLabels';
import { OPTIONS_LANG } from '../../constants';
import ButtonsLang from '../../components/buttons-lang';
import { buildLocationWithNewLang } from '../../utils';
import ArticleCard from '../../components/article-card';
import ArticleCardSkeleton from '../../components/article-card-sceleton';

function Article() {
  const store = useStore();
  const params = useParams();
  const id = params.id;
  const {lang} = useDictionary();
  const linkHome = useHomeLink(lang);
  const navigate = useNavigate();
  const location = useLocation();
  const linkStateTitle = location.state?.title || "Ожидайте ..."
  const {labelsNavigation, labelsArticle, labelsBasketTools} = useLabels();

  const selectOldData= useSelector(state => ({
    articleId: state.article.data._id,
  }));

  useEffect(() => {
    if (selectOldData.articleId !== id) {
      store.actions.article.clear();
      store.actions.modals.open('loading');
    }
    store.actions.article.load({id, lang});
    store.actions.modals.close()
  }, [id, lang]);

  const select = useSelector(state => ({
    article: state.article.data,
    amount: state.basket.amount,
    sum: state.basket.sum,
    openModalBasket: state.modals,
    isLoading: state.article.isLoading,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(id => {
      store.actions.basket.addToBasket(id);
    }, [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    handleLangChange: useCallback(
      (newLang) => {
        if (newLang === lang) return;

        navigate(buildLocationWithNewLang(newLang, location));
      },
      [navigate, location, lang],
    ),
  };

  const title = (!select.article?.title) ? linkStateTitle : select.article?.title

  const renderCard = () => {
    if (select.isLoading) {
      return <ArticleCardSkeleton/>;
    }
    return <ArticleCard item={select.article} onAdd={callbacks.addToBasket} labels={labelsArticle}/>;

  };


  return (
    <PageLayout>
      <Head title={title} loading={select.isLoading}>
        <ButtonsLang currentLang={lang} options={OPTIONS_LANG} onLangChange={callbacks.handleLangChange}/>
      </Head>
      <ControlsPanel>
        <nav>
          <HomeLink link={linkHome} label={labelsNavigation.linkHome}/>
        </nav>

        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}
                    labels={labelsBasketTools}/>
      </ControlsPanel>
      {renderCard()}

    </PageLayout>
  )
}

export default memo(Article);
