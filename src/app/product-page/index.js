import { memo, useCallback, useEffect} from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import ProductDescription from '../../components/product-description';
import Language from '../../components/language';

function ProductPage() {


    const store = useStore();

    const { id } = useParams();
    
    const select = useSelector(state => ({
        productTitle: state.catalog.productTitle,
        productDescription:  state.catalog.productDescription,
        productEdition:  state.catalog.productEdition,
        productPrice:  state.catalog.productPrice,
        productCountry: state.catalog.productCountry,
        productCategory: state.catalog.productCategory,
        productId: state.catalog.productId,
        amount: state.basket.amount,
        sum: state.basket.sum,
        language: state.language.language,
     }));

     useEffect(() => {
      store.actions.catalog.loadProduct(id, select.language);
    }, [id, select.language]);



     const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

        languageRu: useCallback(() => store.actions.language.languageRu(), [store]),
        languageEn: useCallback(() => store.actions.language.languageEn(), [store]),
      };

  return (
    <PageLayout>
      <Language
              language={select.language}
              languageRu={callbacks.languageRu}
              languageEn={callbacks.languageEn}
              />
      <Head title={select.productTitle} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} isMenu={true} language={select.language}/>
      <ProductDescription 
        description={select.productDescription} 
        edition={select.productEdition} 
        price={select.productPrice} 
        country={select.productCountry} 
        category={select.productCategory}
        productId={select.productId}
        onAdd={callbacks.addToBasket}
        language={select.language}
      /> 
    </PageLayout>
  );
}

export default memo(ProductPage);