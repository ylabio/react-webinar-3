import {memo} from "react";
import PropTypes from "prop-types";
import useSelector from "../../store/use-selector";
import {numberFormat} from "../../utils";
import './style.css';

function ItemDetail(props) {

  const gp = props.getPhrase;

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id)
  }

  return (
    <div className='Detail'>
      <p>{ props.item.description }</p>
      <p>{ gp('detail', 'origin', 'Origin') }: <b>{ props.item.madeIn?._type }</b></p>
      <p>{ gp('detail', 'category', 'Category') }: <b>{ props.item.category?._type }</b></p>
      <p>{ gp('detail', 'issue', 'Issue') }: <b>{ props.item.edition }</b></p>
      <p className='Detail-price'>
      { gp('detail', 'price', 'Price ') }: { numberFormat(props.item.price || 0) } ₽</p>
      <button onClick={callbacks.onAdd}>{ gp('general', 'addButton', 'Add ') }</button>
    </div>
  );
}

ItemDetail.propTypes = {
  getPhrase: PropTypes.func.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    madeIn: PropTypes.shape({_type: PropTypes.string}),
    category: PropTypes.shape({_type: PropTypes.string}),
    edition: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemDetail.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemDetail);
