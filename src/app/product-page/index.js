import { useLoaderData } from 'react-router-dom';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import { getProductDetails } from '../api/api';
import { memo, useCallback, useContext, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import ProductDetails from '../../components/product-details/product-details';
import Product from '../../components/product/product';
import MainMenu from '../../components/main-menu';
import { ROUTES } from '../../constants';
import BasketTool from '../../components/basket-tool';
import useSelector from '../../store/use-selector';
import StyledSelector from '../../components/styled-selector';

export async function loader({ params }) {
  const result = await getProductDetails(params.id);

  return { result };
}

function ProductPage() {
  const store = useStore();
  const { result: product } = useLoaderData();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.settings.language,
    dictionary: state.settings.dictionary,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(product._id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    translate: useCallback(key => store.actions.settings.translate(key), [store]),
    changeLanguage: useCallback(
      language => store.actions.settings.changeLanguage(language),
      [store],
    ),
  };

  const productDetails = useMemo(
    () => [
      { translationCode: callbacks.translate('country'), id: 'madeIn' },
      { translationCode: callbacks.translate('category'), id: 'category' },
      { translationCode: callbacks.translate('productionYear'), id: 'edition' },
    ],
    [select.language, callbacks.translate],
  );

  const renders = {
    renderProductDetails: useCallback(
      product => {
        return (
          <ProductDetails
            product={product}
            language={select.language}
            priceTitle={callbacks.translate('price')}
            productDetails={productDetails}
          />
        );
      },
      [callbacks.translate],
    ),
  };

  return (
    <PageLayout>
      <Head title={product.title}>
        <StyledSelector
          onChange={callbacks.changeLanguage}
          value={select.language}
          options={select.dictionary}
        />
      </Head>
      <MainMenu to={ROUTES.MAIN} title={callbacks.translate('home')}>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          cartTitle={callbacks.translate('emptyCart')}
          pluralForm={callbacks.translate('item')}
          language={select.language}
        />
      </MainMenu>
      <Product
        key={product._id}
        product={product}
        onAddToBasket={callbacks.addToBasket}
        renderProductDetails={renders.renderProductDetails}
        title={callbacks.translate('home')}
        buttonTitle={callbacks.translate('add')}
      />
    </PageLayout>
  );
}

export default memo(ProductPage);
