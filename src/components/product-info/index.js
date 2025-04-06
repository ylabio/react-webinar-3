import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { langKeyWords } from '../../utils/lang';

function ProductInfo({ desc = '', country = '', cat = '', year = '', price = '', lang = 'ru', onAdd = () => {} }) {
  const cn = bem('ProductInfo');
  const multi = langKeyWords[lang] || lang.ru;

  return (
    <div className={cn()}>
      <p>{desc}</p>
      <div className={cn('details')}>
        <p>{multi.madeIn}:</p>
        <b>{country}</b>

        <p>{multi.category}:</p>
        <b>{cat}</b>

        <p>{multi.edition}:</p>
        <b>{year}</b>
      </div>
      <h2 className={cn('price')}>{multi.price}: {numberFormat(price, lang)} ₽</h2>
      <div className={cn('actions')}>
        <Button style="primary" onClick={onAdd} title={multi.btnAdd} />
      </div>
    </div>
  );
}

ProductInfo.propTypes = {
  desc: PropTypes.string,
  country: PropTypes.string,
  cat: PropTypes.string,
  year: PropTypes.number,
  price: PropTypes.number,
  lang: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

export default memo(ProductInfo);
