import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {useLanguage} from "../../language-provider";

function ItemSingle({item, addOn}) {

  const { t } = useLanguage()

  const cn = bem('ItemSingle')

  const callbacks = {
    onAdd: (e) => addOn(item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('info')}>{item.description}</div>
      <div className={cn('info')}>
        {t('country')}: <span>{item.madeIn.title}</span>
      </div>
      <div className={cn('info')}>
        {t('category')}: <span>{item.category.title}</span>
      </div>
      <div className={cn('info')}>
        {t('yearOfIssue')}: <span>{item.edition}</span>
      </div>
      <div className={cn('price')}>
        {t('price')}: {item.price} ₽
      </div>
      <div>
        <button onClick={callbacks.onAdd}>
          {t('add')}
        </button>
      </div>
    </div>
  )
}

ItemSingle.PropTypes = {}

export default React.memo(ItemSingle);