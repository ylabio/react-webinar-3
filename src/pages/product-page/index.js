import {useParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {numberFormat} from "../../utils";
import {useTranslate} from "../../i18n";

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
    <div className={cn()}>
      {select.product && (
        <div className={cn('card')}>
          <div>{select.product?.description}</div>
          <div>{t('product-page-manufacturer-country-title')}: <span
            className={cn('bold')}>{select.product?.madeIn?.title}&nbsp;({select.product?.madeIn?.code})</span>
          </div>
          <div>{t('product-page-category-title')}:&nbsp;
            <span className={cn('bold')}>{select.product?.category?.title}</span>
          </div>
          <div>{t('product-page-year-of-issue-title')}:&nbsp;
            <span className={cn('bold')}>{select.product?.edition}</span>
          </div>
          <div className={cn('price')}>{t('product-page-price-title')}:&nbsp;{numberFormat(select.product?.price)}</div>
          <div>
            <button onClick={callbacks.addToBasket}>{t('product-page-add-button-title')}</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductPage;
