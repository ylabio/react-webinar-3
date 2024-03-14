import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from '../../utils';
import './style.css';

function Description (props) {

  const cn = bem('Description');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.card._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('text')}>{props.card.description}</div>
      <div className={cn('text')}>
      {props.multilingualText.country[props.language]}: <span>{props.card.madeIn?.title} ({props.card.madeIn?.code})</span>
      </div>
      <div className={cn('text')}>
      {props.multilingualText.category[props.language]}: <span>{props.card.category?.title}</span>
      </div>
      <div className={cn('text')}>
      {props.multilingualText.year[props.language]}: <span>{props.card.edition}</span>
      </div>
      <div className={cn('text')}>
        <span className={cn('price')}>{props.multilingualText.price[props.language]}: {numberFormat(props.card.price)} ₽</span>
      </div>
      <button onClick={callbacks.onAdd}>{props.multilingualText.buttonAdd[props.language]}</button>
    </div>
  );
}

Description.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  language: PropTypes.node,
  multilingualText: PropTypes.object,
  onAdd: PropTypes.func,
};

Description.defaultProps = {
  onAdd: () => {},
}

export default memo(Description);