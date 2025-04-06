import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import ItemDetails from '../../components/item-details';
import MainMenuLayout from '../../components/main-menu-layout';
import Navigation from '../../components/navigation';
import PageLayout from '../../components/page-layout';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { translations } from '../../utils/translations';

function ItemPage() {
  const store = useStore();
  const { itemId } = useParams();

  useEffect(() => {
    return () => {
      // Сброс выбранного товара
      store.actions.catalog.selectItem(null);
    };
  }, []);

  const select = useSelector(state => ({
    item: state.catalog.selectedItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.currentLanguage,
  }));

  useEffect(() => {
    store.actions.catalog.getItemInfoById(itemId);
  }, [itemId, select.lang]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onChangeLanguage: useCallback(lang => store.actions.language.changeLanguage(lang), [store]),
  };

  const t = translations[select.lang] || translations.ru;

  return (
    <PageLayout>
      <Head
        title={select.item && select.item.title}
        lang={select.lang}
        onLanguageChange={callbacks.onChangeLanguage}
      />
      <MainMenuLayout>
        <Navigation mainNavText={t.mainNav} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          oneItemText={t.oneItem}
          fewItemsText={t.fewItems}
          manyItemsText={t.manyItems}
          cartEmptyText={t.cartEmpty}
        />
      </MainMenuLayout>
      {select.item && (
        <ItemDetails
          item={select.item}
          onAdd={callbacks.addToBasket}
          madeInText={t.madeIn}
          categoryText={t.category}
          editionText={t.edition}
          priceText={t.price}
          buttonTitle={t.buttonAdd}
        />
      )}
    </PageLayout>
  );
}

export default memo(ItemPage);
