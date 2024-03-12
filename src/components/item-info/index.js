import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import { numberFormat } from "../../utils";
import { lang } from "../../data/lang";
import './style.css';

function ItemInfo({item, language, onAdd}) {
  const cn = bem('ItemInfo');

  return (    
      <section className={cn()}>
        <p>{item.description}</p>
        <p>{lang[language].country}: <strong>{item.madeIn?.title} ({item.madeIn?.code})</strong></p>
        <p>{lang[language].category}: <strong>{item.category?.title}</strong></p>
        <p>{lang[language].year}: <strong>{item.edition}</strong></p>
        <h1>{lang[language].price}: {numberFormat(item.price)} ₽</h1>
        <button onClick={onAdd}>{lang[language].add}</button>
      </section>
  )
}

ItemInfo.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      _id: PropTypes.string,
      code: PropTypes.string,
      title: PropTypes.string,
    }),
    edition: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
    })
  }).isRequired,
  language: PropTypes.string,
  onAdd: PropTypes.func
};

ItemInfo.defaultProps = {
  language: 'ru',
  onAdd: () => {}
}

export default React.memo(ItemInfo);