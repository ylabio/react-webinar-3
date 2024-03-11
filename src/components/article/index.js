import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Article({articleId, item, onAdd}) {
  
  const cn = bem('Article');

  const callbacks = {
    onAdd: (e) => onAdd(articleId)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.description}</div>
      <div className={cn('made')}>Страна производителя: <b>{item.madeIn}</b></div>
      <div className={cn('category')}>Категория: <b>{item.category}</b></div>
      <div className={cn('edition')}>Год выпуска: <b>{item.edition}</b></div>
      <div className={cn('price')}>Цена: {item.price} ₽</div>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

Article.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func
};

Article.defaultProps = {
  onAdd: () => {}
}

export default memo(Article);
