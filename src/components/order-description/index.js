import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { content } from "../../store/translation/content";

function Description(props) {

  const cn = bem('Description');
  const callbacks = {
    addToBasket: (e) => props.addToBasket(props.id)
  }

  return (
    <div className={cn()}>
      <p className={cn('text')}>{`${props.description}`}</p>
      <p className={cn('country')} >{`${content[props.lang].country}: `}<span className={cn('country-value')}>{`${props.madeIn} (${props.madeInCode})`}</span></p>
      <p className={cn('category')} >{`${content[props.lang].category}: `}<span className={cn('category-value')}>{`${props.category}`}</span></p>
      <p className={cn('year')} >{`${content[props.lang].year}: `}<span className={cn('category-value')}>{`${props.year}`}</span></p>
      <p className={cn('price')} >{`${content[props.lang].price}:  ${props.price} ₽`}</p>
      <button onClick={callbacks.addToBasket} lang-key='add'>{content[props.lang].add}</button>
    </div>
  );
}

// PageLayout.propTypes = {
//   children: PropTypes.node
// }

export default memo(Description);
