import React, {memo, useContext} from 'react';
import {numberFormat, translate} from "../../utils";
import PropTypes from "prop-types";
import {LanguageContext} from "../../store/context";
import './style.css';

const ArticleInfo = ({ article, onAdd }) => {
  const activeLanguage = useContext(LanguageContext)

  return (
    <div className={'Article'}>
      <p>{article.description}</p>
      <p>{translate('country', activeLanguage)}: <b>{article.country}</b></p>
      <p>{translate('category', activeLanguage)}: <b>{article.category}</b></p>
      <p>{translate('edition', activeLanguage)}: <b>{article.edition}</b></p>
      <h2><b>{translate('price', activeLanguage)}: {numberFormat(article.price)} ₽</b></h2>
      <button type={"button"} onClick={() => onAdd(article._id)}>{translate('add', activeLanguage)}</button>
    </div>
  );
};

ArticleInfo.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ArticleInfo.defaultProps = {
  onAdd: () => {},
};

export default memo(ArticleInfo);