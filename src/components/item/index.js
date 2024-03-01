import React from "react";
import PropTypes from "prop-types";
import {formatCurrency} from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    onAdd: () => {
      props.onAdd(props.item.code);
    },
    onDelete: () => {
      props.onDelete(props.item.code);
    }
  }

  console.log(props.options.is)

  return (
    <div className={'Item'}
         onClick={callbacks.onClick}>
      <div className='Item-part  Item-part-left'>
        <div className='Item-code'>{props.item.code}</div>
        <div className='Item-title'>
          {props.item.title}
        </div>
      </div>
      <div className='Item-part Item-part-right'>
        <div className='Item-price'>
          {formatCurrency(props.item.price)}
        </div>
        { props.options.showCount && <div className='Item-count'>
            {props.item.count + " шт"}
          </div>
        }
        <div className='Item-actions'>
          { props.options.isAppendable && <button onClick={callbacks.onAdd}>
              Добавить
            </button>
          }
          { props.options.isDeletable && <button onClick={callbacks.onDelete}>
              Удалить
            </button>
          }
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  options: PropTypes.shape({
    showCount: PropTypes.bool,
    isAppendable: PropTypes.bool,
    isDeletable: PropTypes.bool
  }),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func
};

Item.defaultProps = {
  options: {
    showCount: false,
    isAppendable: true,
    isDeletable: false
  },
  onAdd: () => {},
  onDelete: () => {}
}

export default React.memo(Item);
