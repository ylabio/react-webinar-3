import { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../locales';
import './style.css';

function Product({
  _id,
  description = '',
  madeIn = '',
  category = '',
  edition = '',
  price = 0,
  onAdd = () => {}
}) {
  const cn = bem('Product');

  const handleAdd = () => onAdd(_id);
  const { language } = useContext(LanguageContext);

  return (
    <div className={cn()}>
      <p className={cn('description')}>{description}</p>
      <dl className={cn('list')}>
        <dt>{translations[language].madeIn}:</dt>
        <dd>{madeIn}</dd>
        <dt>{translations[language].category}:</dt>
        <dd>{category}</dd>
        <dt>{translations[language].edition}:</dt>
        <dd>{edition}</dd>
      </dl>
      <p className={cn('price')}>{translations[language].price}:&ensp;{numberFormat(price)} ₽</p>
      <Button style="primary" onClick={handleAdd} title={translations[language].addToCart} />
    </div>
  );
}

Product.propTypes = {
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string,
  madeIn: PropTypes.string,
  category: PropTypes.string,
  edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.number,
  onAdd: PropTypes.func,
};

export default memo(Product);
