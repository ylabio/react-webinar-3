import { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ItemCard from '../../components/item-card';
import NavigationTool from '../../components/navigation-tool';
import Navigation from '../../components/navigation';
import LanguageTool from '../../components/language-tool';
import { translate, availableLanguages } from '../../language/translator';

function Card() {
  const store = useStore();
  const params = useParams();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.count,
    cardData: state.cardStore.cardData,
    isLoading: state.cardStore.isLoading,
    language: state.language.currentLang
  }));

  useEffect(() => {
    store.actions.cardStore.loadCardData(params.id);
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена языка
    setLanguage: useCallback(lang => store.actions.language.setLanguage(lang), [store])
  };

  const translator = {
    dictionary: useMemo(() => translate(select.language))
  }

  console.log(translator);

  return (
    <PageLayout>
      <Head title={translator.dictionary.cart.title}>
        <LanguageTool setLanguage={callbacks.setLanguage} currentLanguage={select.language} availableLanguages={availableLanguages} />
      </Head>
      <NavigationTool>
        <Navigation navItems={[{title: translator.dictionary.navigation.main, link: '/'}]} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} translator={translator} />
      </NavigationTool>
      <ItemCard cardData={select.cardData} onAdd={callbacks.addToBasket} isLoading={select.isLoading} translator={translator} />
    </PageLayout>
  )
}

export default memo(Card);