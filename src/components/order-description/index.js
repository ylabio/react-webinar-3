import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { content } from "../../store/translation/content";

function Description(props) {

  const cn = bem('Description');
  const callbacks = {
    addToBasket: (e) => props.addToBasket(props.orderDescription._id)
  }

  return (
    <div className={cn()}>
      <p className={cn('text')}>{`${props.orderDescription.description}`}</p>
      <p className={cn('country')} >{`${content[props.lang].country}: `}<span className={cn('country-value')}>{`${props.orderDescription.madeIn?.title} (${props.orderDescription.madeIn?.code})`}</span></p>
      <p className={cn('category')} >{`${content[props.lang].category}: `}<span className={cn('category-value')}>{`${props.orderDescription.category?.title}`}</span></p>
      <p className={cn('year')} >{`${content[props.lang].year}: `}<span className={cn('category-value')}>{`${props.orderDescription.edition}`}</span></p>
      <p className={cn('price')} >{`${content[props.lang].price}:  ${props.orderDescription.price} ₽`}</p>
      <button onClick={callbacks.addToBasket}>{content[props.lang].add}</button>
    </div>
  );
}

Description.propTypes = {
  orderDescription: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    price: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string
    }),
    edition: PropTypes.number,
  }).isRequired,
  addToBasket: PropTypes.func,
  lang: PropTypes.string,
}

Description.defaultProps = {
  addToBasket: () => {},
  lang: 'ru',
};

export default memo(Description);
