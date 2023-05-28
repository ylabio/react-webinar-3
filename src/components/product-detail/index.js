import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProductDetail(props){ 
 
  const cn = bem('ProductDetail');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }
    
  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.item && props.item.description}</div>
      <div className={cn('description')}>{props.getTranslation('MADE_IN', props.language)}: <strong>{props.item.madeIn && props.item.madeIn.title}</strong></div>
      <div className={cn('description')}>{props.getTranslation('CATEGORY', props.language)}: <strong>{props.item.category && props.item.category.title}</strong></div>
      <div className={cn('description')}>{props.getTranslation('EDITION', props.language)}: <strong>{props.item && props.item.edition}</strong></div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{props.getTranslation('PRICE', props.language)}: {props.item && props.item.price} ₽</div>
        <button onClick={callbacks.onAdd}>{props.getTranslation('ADD', props.language)}</button>
      </div>
    </div>
  )
}

ProductDetail.propTypes = { 
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),    
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  language: PropTypes.string,
  getTranslation: PropTypes.func
};

ProductDetail.defaultProps = {
  onAdd: () => {},
  getTranslation: () => {}
}

export default memo(ProductDetail);
