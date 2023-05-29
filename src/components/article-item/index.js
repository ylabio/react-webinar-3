import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ArticleItem(props) {
  const cn = bem('Article');


  const callbacks = {
    onAdd: () => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {props.item.description}
      </div>
      <div className={cn('title')}>
        Страна производитель: <span className={cn('info')}>{props.item.madeIn.title} ({props.item.madeIn.code})</span>
      </div>
      <div className={cn('title')}>
        Категория: <span className={cn('info')}>{props.item.category.title}</span>
      </div>
      <div className={cn('title')}>
        Год выпуска: <span className={cn('info')}>{props.item.edition}</span>
      </div>
      <div className={cn('price')}>
        Цена: <span className={cn('info')}>{numberFormat(props.item.price)} ₽</span>
      </div>
      <div className={cn('actions')}>
        <button
          onClick={callbacks.onAdd}
        >Добавить
        </button>
      </div>
    </div>
  );
}

ArticleItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
    madeIn : PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string
    }),
    edition: PropTypes.number,
    price: PropTypes.number,
    order: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ArticleItem.defaultProps = {
  // onAdd: () => {},
}

export default memo(ArticleItem);
