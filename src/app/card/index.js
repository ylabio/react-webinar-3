import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import CardContent from "../../components/item-card";
import { useParams } from 'react-router-dom';
import Menu from '../../components/menu';
import MenuLayout from '../../components/menu-layout';
import Preloader from '../../components/preloader';
import { LanguageList } from '../../lang';

function Card() {

  const store = useStore();
  let { id } = useParams();

  useEffect(() => {
    store.actions.modals.close();
    store.actions.card.loadCard(id);
  }, [id]);

  const select = useSelector(state => ({
    card: state.card.card,
    amount: state.basket.amount,
    sum: state.basket.sum,
    menu: state.menu,
    language: state.language.language
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const translate = (elem) => LanguageList[select.language][elem]

  return (
    <PageLayout>
      <Head title={select.card?.title} />
      <MenuLayout>
        <Menu menu={select.menu} translate={translate} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} translate={translate} />
      </MenuLayout>
      {select.card
        ? <CardContent card={select.card} onAdd={callbacks.addToBasket} madeIn={translate('madeIn')}
          category={translate('category')} edition={translate('edition')} price={translate('price')}
          buttonName={translate('add')} />
        : <Preloader />}
    </PageLayout>
  );
}

export default memo(Card);
