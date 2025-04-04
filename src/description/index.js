import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { STRINGS } from '../const';
import { numberFormat } from '../utils';
import { useAppContext } from '../app-context';
import './style.css';

function Description({ country, category, year, price}) {
  const cn = bem('Description-container');
  const propsData = { country, category, year };
  const { language } = useAppContext();

  return (
    <>
      <div className={cn()}>
        <div className={cn('title')}>
          {Object.values(STRINGS.DESCRIPTION_TITLE).map((item) => (
            <div className={cn('title-item')}>{item[language]}</div>
          ))}
        </div>
        <div className={cn('text')}>
          {Object.values(propsData).map((item) => (
            <div className={cn('text-item')}>{item}</div>
          ))}
        </div>
      </div>
      <div className={cn('price')}>{`${STRINGS.PRICE[language]} ${numberFormat(price)} ₽`}</div>
    </>
  )
}

export default memo(Description);
