import PropTypes from 'prop-types';
import './style.css';
import {memo} from "react";
import Item from "../item";

function List({list, onAction, buttonTitle, itemComponent: ItemComponent}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <ItemComponent
            item={item}
            onAction={onAction}
            buttonTitle={buttonTitle}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteFromCart: PropTypes.func,
  onAction: PropTypes.func,
  buttonTitle: PropTypes.string,
  itemComponent: PropTypes.elementType,
};

List.defaultProps = {
  onAction: () => {},
  itemComponent: Item
};

export default memo(List);
