import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Description(props) {

  const cn = bem('Description');
  const callbacks = {
    addToBasket: (e) => props.addToBasket(props.id)
  }

  return (
    <div className={cn()}>
      <p className={cn('text')}>{`${props.description}`}</p>
      <p className={cn('country')}>{`Страна производитель: ${props.madeIn} (${props.madeInCode})`}</p>
      <p className={cn('category')}>{`Категория: ${props.category}`}</p>
      <p className={cn('year')}>{`Год выпуска: ${props.year}`}</p>
      <p className={cn('price')}>{`Цена:  ${props.price} ₽`}</p>
      <button onClick={callbacks.addToBasket}>Добавить</button>
    </div>
  );
}

// PageLayout.propTypes = {
//   children: PropTypes.node
// }

export default memo(Description);
