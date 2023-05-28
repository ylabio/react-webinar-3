import {useParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {cn as bem} from "@bem-react/classname";
import {useTranslate} from "../../i18n";
import ProductCard from "../../components/product-card";

function ProductPage() {
  const {id} = useParams();
  const store = useStore();
  const cn = bem('ProductPage');
  const t = useTranslate();


  useEffect(() => {
    store.actions.application.setHeadTitle('Загрузка...');
    store.actions.product.load(id);
    return () => {
      store.actions.application.setHeadTitle('');
      store.actions.product.clear();

    }
  }, [id])

  const select = useSelector(state => ({
    product: state.product.productData

  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),
  }

  useEffect(() => {
    if (select.product) {
      store.actions.application.setHeadTitle(select.product.title);
    }

  }, [select.product])

  return (
    <>
      {select.product && (
        <ProductCard
          product={select.product}
          addToBasket={callbacks.addToBasket}
          manufacturerCountryTitle={t('product-page-manufacturer-country-title')}
          categoryTitle={t('product-page-category-title')}
          yearOfIssueTitle={t('product-page-year-of-issue-title')}
          priceTitle={t('product-page-price-title')}
          addButtonTitle={t('product-page-add-button-title')}
        />
      )}
    </>
  )
}

export default ProductPage;
