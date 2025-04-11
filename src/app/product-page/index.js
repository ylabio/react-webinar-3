import { useLoaderData } from 'react-router-dom';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import { getProductDetails } from '../api/api';
import { memo, useCallback, useContext, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import { LanguageContext } from '../../store/context';
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
  const { translate, language, setLanguage } = useContext(LanguageContext);
  const productDetails = useMemo(
    () => [
      { translationCode: translate('country'), id: 'madeIn' },
      { translationCode: translate('category'), id: 'category' },
      { translationCode: translate('productionYear'), id: 'edition' },
    ],
    [language, translate],
  );

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(product._id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    renderProductDetails: useCallback(
      product => {
        return (
          <ProductDetails
            product={product}
            language={language}
            priceTitle={translate('price')}
            productDetails={productDetails}
          />
        );
      },
      [translate],
    ),
  };

  return (
    <PageLayout>
      <Head title={product.title}>
        <StyledSelector onChange={setLanguage} value={language} options={['en', 'ru']} />
      </Head>
      <MainMenu to={ROUTES.MAIN} title={translate('home')}>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </MainMenu>
      <Product
        key={product._id}
        product={product}
        translate={translate}
        onAddToBasket={callbacks.addToBasket}
        renderProductDetails={renders.renderProductDetails}
        title={translate('home')}
        buttonTitle={translate('add')}
      />
    </PageLayout>
  );
}

export default memo(ProductPage);
