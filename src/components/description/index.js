import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css'
import { locale } from "../../locale";

function Description(props) {
  const cn = bem('Description');
  return (
    <div className={cn()}>
      <div className={cn('text')}>{props.item.description}</div>
      {props.item.madeIn && <div className={cn('country')}>
        {locale[props.lang].description.country}:
        <span>{props.item.madeIn.title} ({props.item.madeIn.code})</span>
      </div>}
      {props.item.category && <div className={cn('category')}>
        {locale[props.lang].description.category}:
        <span>{props.item.category.title}</span>
      </div>}
      <div className={cn('year')}>
        {locale[props.lang].description.year}:
        <span>{props.item.edition}</span>
      </div>
      <div className={cn('price')}>
        {locale[props.lang].description.price}:
        <span>{numberFormat(props.item.price)} ₽</span>
      </div>
      {props.children}
    </div>
  )
}

Description.propTypes = {
  children: PropTypes.node,
  item: PropTypes.object,
  lang: PropTypes.string
};

export default React.memo(Description);
