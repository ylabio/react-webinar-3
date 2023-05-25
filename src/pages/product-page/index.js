import {useParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {numberFormat} from "../../utils";

function ProductPage() {
  const {id} = useParams();
  const store = useStore();
  const cn = bem('ProductPage');


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
          <div>Страна производитель: <span
            className={cn('bold')}>{select.product?.madeIn?.title}&nbsp;({select.product?.madeIn?.code})</span>
          </div>
          <div>Категория:&nbsp;
            <span className={cn('bold')}>{select.product?.category?.title}</span>
          </div>
          <div>Год выпуска:&nbsp;
            <span className={cn('bold')}>{select.product?.edition}</span>
          </div>
          <div className={cn('price')}>Цена:&nbsp;{numberFormat(select.product?.price)}</div>
          <div>
            <button onClick={callbacks.addToBasket}>добавить</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductPage;
