import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import useLanguage from "../../../localization/use-language";
import { numberFormat } from "../../../utils";
import './style.css';

function ItemArticle({ info, onAdd }) {

  const cn = bem('ItemArticle');

  const callbacks = {
    onAdd: useCallback(e => onAdd(info._id), [onAdd, info])
  };

  const ln = useLanguage();

  return (
    <div className={cn()}>
      <div className={cn('block')}>{info.description}</div>
      <div className={cn('block')}>{ln('country')} <b>{info.madeIn?.title} ({info.madeIn?.code})</b></div>
      <div className={cn('block')}>{ln('category')} <b>{info.category?.title}</b></div>
      <div className={cn('block')}>{ln('year')} <b>{info.edition}</b></div>
      <div className={cn('price')}><b>{ln('price')} {numberFormat(info.price)} ₽</b></div>
      <button className={cn('button')} onClick={callbacks.onAdd}>{ln('buttonAdd')}</button>
    </div>
  )
}

ItemArticle.propTypes = {
  info: PropTypes.object.isRequired,
  onAdd: PropTypes.func
}

ItemArticle.defaultProps = {
  onAdd: () => { }
}

export default React.memo(ItemArticle);