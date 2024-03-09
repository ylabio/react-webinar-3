import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function Detailizer({article, onAdd}) {

  const cn = bem('Detailizer');

  const callbacks = {
    onAdd: (e) => onAdd(article._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>{ article.description }</div>
      { article.madeIn.title &&
          <div className={cn('attribute')}>Страна производитель: <span className={cn('attribute', {'value': true})}>{ article.madeIn.title }</span></div> }
      { article.category.title &&
          <div className={cn('attribute')}>Категория: <span className={cn('attribute', {'value': true})}>{ article.category.title }</span></div> }
      { article.edition &&
          <div className={cn('attribute')}>Год выпуска: <span className={cn('attribute', {'value': true})}>{ article.edition }</span></div> }
      <div className={cn('price')}>Цена: {numberFormat(article.price)} ₽</div>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

Detailizer.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({title: PropTypes.string}),
    category: PropTypes.shape({title: PropTypes.string}),
    edition: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Detailizer.defaultProps = {
  onAdd: () => {},
}

export default memo(Detailizer);