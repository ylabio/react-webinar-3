import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ProductCard from '../../components/product-card';
import BasketTool from '../../components/basket-tool';
import Select from '../../components/select';
import useStore from '../../store/use-store';
import { useParams } from 'react-router-dom';
import useSelector from '../../store/use-selector';

function ProductInfo() {
  const store = useStore();
  const { id } = useParams();

  useEffect(() => {
    store.actions.product.productLoad(id);
  }, [id]);

  const select = useSelector(state => ({
    productItem: state.product.productItem,
    amount: state.basket.amount,
    localText: state.languages.text[state.languages.currentLanguage],
    sum: state.basket.sum,
    lang: state.languages.currentLanguage,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeLanguage: useCallback(lang => store.actions.languages.setLanguages(lang), [store]),
  };

  const propSelect = {
    lang: [
      { value: 'ru', title: 'RU' },
      { value: 'en', title: 'EN' },
    ],
  };

  return (
    <PageLayout>
      <Head title={select.productItem?.title}>
        <Select
          value={select.lang}
          propSelect={propSelect.lang}
          changeSelect={callbacks.changeLanguage}
        />
      </Head>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        localText={select.localText}
      />
      <ProductCard
        productInfo={select.productItem}
        addToBasket={callbacks.addToBasket}
        localText={select.localText}
      />
    </PageLayout>
  );
}

export default memo(ProductInfo);
