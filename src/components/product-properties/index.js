//import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {numberFormat} from "../../utils";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import {cn as bem} from '@bem-react/classname';

function ProductProperties(props) {
  const cn = bem('ProductProperties');
  return (
    <>
        <Head title={props.product.title}/>
          <BasketTool onOpen={props.onOpen}
                      amount={props.amount}
                      sum={props.sum}
                             main={props.main}
                             label={props.label}
                             buttonBasket={props.buttonBasket}
                             one={props.one}
                             few={props.few}
                             many={props.many}
                             empty={props.empty}/>
        <div className={cn()}>
        <div className={cn('box')}>
            {props.product.description}
        </div>
        <div className={cn('box')}>
            <span>{props.madeIn}:</span>
            <span className={cn('bold')}>{props.product.madeIn}</span>
        </div>
        <div className={cn('box')}>
            <span>{props.category}:</span>
            <span className={cn('bold')}>{props.product.category}</span>
        </div>
        <div className={cn('box')}>
            <span>{props.edition}:</span>
            <span className={cn('bold')}>{props.product.edition}</span>
        </div>
        <div className={cn('box')}>
            <span className={cn('bold-big')}>{props.price}: </span>
            <span className={cn('bold-big')}>{`${numberFormat(props.product.price)} ₽`}</span>
        </div>
        <div className={cn('box')}>
          <button onClick={() => props.addToBasket(props.product._id)}>{props.buttonAddProduct}</button>
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
  main: PropTypes.string,
  label: PropTypes.string,
  buttonBasket: PropTypes.string,
  one: PropTypes.string,
  few: PropTypes.string,
  many: PropTypes.string,
  empty: PropTypes.string,
  addToBasket: PropTypes.func,
  madeIn: PropTypes.string,
  category: PropTypes.string,
  edition: PropTypes.string,
  price: PropTypes.string,
  buttonAddProduct: PropTypes.string,
};

ProductProperties.defaultProps = {
  onOpen: () => {},
  addToBasket: () => {},
}

export default ProductProperties;
