import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { STRINGS } from '../const';
import { numberFormat } from '../utils';
import { useAppContext } from '../app-context';
import './style.css';

function Description({ country, category, year, price, texts, language}) {
  const cn = bem('Description-container');
  const propsData = { country, category, year };
  // const { language } = useAppContext();

  return (
    <>
      <div className={cn()}>
        <div className={cn('title')}>
          {Object.values(texts.descriptionTitle).map((item) => (
            <div key={item[language]} className={cn('title-item')}>{item[language]}</div>
          ))}
        </div>
        <div className={cn('text')}>
          {Object.values(propsData).map((item) => (
            <div key={item} className={cn('text-item')}>{item}</div>
          ))}
        </div>
      </div>
      <div className={cn('price')}>{`${texts.price} ${numberFormat(price)} ₽`}</div>
    </>
  )
}

Description.propTypes = {
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  price: PropTypes.number.isRequired,
};

export default memo(Description);
