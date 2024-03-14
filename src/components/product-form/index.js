import React from 'react';
import './style.css';
import {lang as langData} from '../../lang/data';
import {numberFormat} from "../../utils";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";

const ProductForm = ({item, lang, addToBasket}) => {

  const cn = bem('ProductForm')

  return (
    <div className={cn()}>
      <div className={cn('body')}>
        <div className={cn('desc')}>
          {item?.description}
        </div>
        <div className={cn('made')}>
          {langData.itemPage.country[lang]}: <b>{item?.madeIn.title} ({item?.madeIn.code})</b>
        </div>
        <div className={cn('cat')}>
          {langData.itemPage.category[lang]}: <b>{item?.category.title}</b>
        </div>
        <div className={cn('year')}>
          {langData.itemPage.year[lang]}: <b>{item?.edition}</b>
        </div>
        <div className={cn('price')}>
          {langData.itemPage.price[lang]}: {numberFormat(item?.price)} ₽
        </div>
        <button
          className={cn('btn')}
          onClick={() => addToBasket(item?._id)}>
          {langData.buttons.add[lang]}
        </button>
      </div>
    </div>
  );
};

ProductForm.propTypes = {
  item: PropTypes.object,
  lang: PropTypes.string,
  addToBasket: PropTypes.func
}

ProductForm.defaultProps = {
  addToBasket: () => {}
}

export default React.memo(ProductForm);
