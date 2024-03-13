import React from 'react';
import './style.css'
import {lang as langData} from "../../lang/data";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";

const ProductFormLoader = ({ isLoading, children, lang }) => {

  const cn = bem('ProductFormLoader')

  return (
    <>
      {isLoading ?
        <div>
          <div className={cn('body')}>
            <div className={cn('desc')}>
              <span>{langData.loader[lang]}</span>
            </div>
            <div className={cn('made')}>
              {langData.itemPage.country[lang]}: <span>{langData.loader[lang]}</span>
            </div>
            <div className={cn('cat')}>
              {langData.itemPage.category[lang]}: <span>{langData.loader[lang]}</span>
            </div>
            <div className={cn('year')}>
              {langData.itemPage.year[lang]}: <span>{langData.loader[lang]}</span>
            </div>
            <div className={cn('price')}>
              {langData.itemPage.price[lang]}: <span>{langData.loader[lang]}</span>
            </div>
            <button className={cn('btn')}>
              {langData.loader[lang]}
            </button>
          </div>
        </div> :
        children
      }
    </>
  );
};

ProductFormLoader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  lang: PropTypes.string
}

export default ProductFormLoader;
