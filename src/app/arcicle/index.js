import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import { Link, useParams } from "react-router";
import ControlsPanel from "../../components/controls-panel";
import ArticleCard from "../../components/article-card";
import useSelector from "../../store/use-selector";
import HomeLink from "../../components/home-link";
import { useDictionary } from '../../translations/useDictionary';
import { useHomeLink } from '../../hooks/useHomeLink';
import { useLabels } from '../../translations/useLabels';

function Article() {
  const store = useStore();
  const params = useParams();
  const id = params.id;

  const {lang} = useDictionary();
  const linkHome = useHomeLink(lang)

  const {labelsNavigation, labelsArticle, labelsBasketTools } = useLabels();

  const select = useSelector(state => ({
    article: state.article,
    amount: state.basket.amount,
    sum: state.basket.sum,
    openModalBasket: state.modals,
  }));

  useEffect(() => {
    store.actions.article.load({id, lang});
    return () => store.actions.article.clear();
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(id => {
      store.actions.basket.addToBasket(id);
    }, [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return select.article.article.title ? (
    <PageLayout>
      <Head title={select.article.article.title}/>
      <ControlsPanel>
        <nav>
          <HomeLink link={linkHome} label={labelsNavigation.linkHome}/>
        </nav>

        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} labels={labelsBasketTools}/>
      </ControlsPanel>

      <ArticleCard item={select.article.article} onAdd={callbacks.addToBasket} labels={labelsArticle} />


    </PageLayout>
  ) : (<PageLayout>
    <Head title={'Загрузка'}/>
    <ControlsPanel>
      <Link to={{pathname: "/"}}>Главная</Link>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} labels={labelsBasketTools} />
    </ControlsPanel>

    <h1> Загрузка </h1>

  </PageLayout>);
}

export default memo(Article);
