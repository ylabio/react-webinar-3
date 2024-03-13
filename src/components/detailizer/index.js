import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function Detailizer(props) {

  const cn = bem('Detailizer');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{ props.article.description }</div>
      { props.article.madeIn.title &&
          <div className={cn('attribute')}>{props.translate('manufacturer country')}: <span className={cn('attribute', {'value': true})}>{ props.article.madeIn.title }</span></div> }
      { props.article.category.title &&
          <div className={cn('attribute')}>{props.translate('category')}: <span className={cn('attribute', {'value': true})}>{ props.article.category.title }</span></div> }
      { props.article.edition &&
          <div className={cn('attribute')}>{props.translate('year of issue')}: <span className={cn('attribute', {'value': true})}>{ props.article.edition }</span></div> }
      <div className={cn('price')}>{props.translate('price')}: {numberFormat(props.article.price)} ₽</div>
      <button onClick={props.onAdd}>{props.translate('add')}</button>
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
  translate: PropTypes.func,
  onAdd: PropTypes.func,
};

Detailizer.defaultProps = {
  translate: () => {},
  onAdd: () => {},
}

export default memo(Detailizer);