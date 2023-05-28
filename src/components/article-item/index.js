import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ArticleItem(props) {
  const cn = bem('Article');

  const callbacks = {
    onAdd: () => props.onAdd(props.id)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {props.description}
      </div>
      <div className={cn('title')}>
        Страна производитель: <span className={cn('info')}>{props.madeIn} ({props.codeCountry})</span>
      </div>
      <div className={cn('title')}>
        Категория: <span className={cn('info')}>{props.category}</span>
      </div>
      <div className={cn('title')}>
        Год выпуска: <span className={cn('info')}>{props.edition}</span>
      </div>
      <div className={cn('price')}>
        Цена: <span className={cn('info')}>{numberFormat(props.price)} ₽</span>
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
  id: PropTypes.string,
  description: PropTypes.string,
  madeIn: PropTypes.string,
  codeCountry: PropTypes.string,
  category: PropTypes.string,
  edition: PropTypes.string,
  price: PropTypes.number,
  onAdd: PropTypes.func,
};

ArticleItem.defaultProps = {
  // onAdd: () => {},
}

export default memo(ArticleItem);
