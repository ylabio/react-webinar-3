import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Button from '../button';

import { numberFormat } from '../../utils';
import { LANGUAGES } from '../../lang/languages';

import './style.css';

function ProductCard({ lang = 'ru', ...props }) {
  const cn = bem('ProductCard');

  const callbacks = {
    onAddToBasket: e => props.onAddToBasket(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.item.description}</div>
      <ul className={cn('list')}>
        <li className={cn('country')}>
          <span className={cn('category--title')}>{LANGUAGES[lang].country}:</span>
          <span className={cn('category--description')}>
            {props.item.madeIn.title} ({props.item.madeIn.code})
          </span>
        </li>
        <li className={cn('category')}>
          <span className={cn('category--title')}>{LANGUAGES[lang].category}:</span>{' '}
          <span className={cn('category--description')}>{props.item.category.title}</span>
        </li>
        <li className={cn('edition')}>
          <span className={cn('category--title')}>{LANGUAGES[lang].edition}:</span>{' '}
          <span className={cn('category--description')}>{props.item.edition}</span>
        </li>
      </ul>
      <div className={cn('price')}>
        {LANGUAGES[lang].price}: <span>{numberFormat(props.item.price)} ₽</span>
      </div>

      <Button style="primary" onClick={callbacks.onAddToBasket} title={LANGUAGES[lang].add} />
    </div>
  );
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number,
    category: PropTypes.shape({ title: PropTypes.string }),
    madeIn: PropTypes.shape({ title: PropTypes.string, code: PropTypes.string }),
    description: PropTypes.string,
  }).isRequired,
  lang: PropTypes.string,
  onAddToBasket: PropTypes.func,
};
export default ProductCard;
