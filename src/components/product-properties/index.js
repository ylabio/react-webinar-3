import PropTypes from 'prop-types';
import './style.css';
import {numberFormat} from "../../utils";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import {cn as bem} from '@bem-react/classname';

function ProductProperties({product,onOpen,sum,amount,addToBasket}) {
  const cn = bem('ProductProperties');
  return (
    <>
        <Head title={product.title}/>
          <BasketTool onOpen={onOpen}
                      amount={amount}
                      sum={sum}/>
        <div className={cn()}>
        <div className={cn('box')}>
            {product.description}
        </div>
        <div className={cn('box')}>
            <span>Страна производитель:</span>
            <span className={cn('bold')}>{product.madeIn}</span>
        </div>
        <div className={cn('box')}>
            <span>Категория:</span>
            <span className={cn('bold')}>{product.category}</span>
        </div>
        <div className={cn('box')}>
            <span>Год выпуска:</span>
            <span className={cn('bold')}>{product.edition}</span>
        </div>
        <div className={cn('box')}>
            <span className={cn('bold-big')}>Цена: </span>
            <span className={cn('bold-big')}>{`${numberFormat(product.price)} ₽`}</span>
        </div>
        <div className={cn('box')}>
          <button onClick={() => addToBasket(product._id)}>Добавить</button>
        </div>
        </div>
    </>
  )
}

ProductProperties.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  addToBasket: PropTypes.func,
};

ProductProperties.defaultProps = {
  onOpen: () => {},
  addToBasket: () => {},
}

export default ProductProperties;
