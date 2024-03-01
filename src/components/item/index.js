import React from "react";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
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

  return (
    <tr key={props.item.code} className='Item'>
      <td className='Item-code'>{props.item.code}</td>
      <td className='Item-title'>{props.item.title}</td>
      <td className='Item-price'>{numberFormat(props.item.price)}</td>
      { props.options.showCount && <td className='Item-count'>
          {numberFormat(props.item.count, 'decimal', 0) + "\u00a0шт"}
        </td>
      }
      <td className='Item-actions'>
        { props.options.isAppendable && <button onClick={callbacks.onAdd}>
            Добавить
          </button>
        }
        { props.options.isDeletable && <button onClick={callbacks.onDelete}>
            Удалить
          </button>
        }
      </td>
    </tr>
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
