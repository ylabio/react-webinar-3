import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";

function Item(props) {
  const cn = bem('Item');
  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
    loadArticle: () => props.loadArticle(props.item._id),

  }
  return (
    <div className={cn()}>
      <Link className={cn('title')}
            to={`/articles/${props.item._id}`}
      >
        <span className={cn('titleLink')}
              onClick={callbacks.loadArticle}
        >{props.item.title}</span>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  loadArticle: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {
  },
  loadArticle: () => {
  },
}

export default memo(Item);
