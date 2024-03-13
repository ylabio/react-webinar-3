import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function Details({detail, onAdd}) {

  const cn = bem('Details');
  console.log(detail);

  return (
    <div className={cn()}>
      <p className={cn('description')}>{detail.description}</p>
      <p className={cn('madein')}>Страна производитель:
        <span className={cn('madein', {weight: 'bold'})}>
          {detail.madeIn?.title} ({detail.madeIn?.code})
        </span>
      </p>
      <p className={cn('category')}>Категория:
        <span className={cn('category', {weight: 'bold'})}>
          {detail.category?.title}
        </span>
      </p>
      <p className={cn('edition')}>Год выпуска:
        <span className={cn('edition', {weight: 'bold'})}>
          {detail.edition}
        </span>
      </p>
      <p className={cn('price')}>Цена: {numberFormat(detail.price)} ₽</p>
      <button onClick={() => onAdd(detail._id)}>Добавить</button>
    </div>
  )
}

Details.propTypes = {
  detail: PropTypes.objectOf(PropTypes.any),
  onAdd: PropTypes.func.isRequired,
};

Details.defaultProps = {
  detail: {},
  onAdd: () => {},
}

export default memo(Details);
