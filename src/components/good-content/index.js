import React from 'react'
import {cn as bem} from '@bem-react/classname';
import { numberFormat } from '../../utils'
import './style.css'

function GoodContent({id, details, addToBasket, localize}) {
  const cn = bem('Good')
  
  return (
    <div className={cn('content')}>
      <p className={cn('property')}>{details.description}</p>
      <p className={cn('property')}>{localize('manufacturer')}: <b>{details.madeInTitle} ({details.madeInCode})</b></p>
      <p className={cn('property')}>{localize('category')}: <b>{details.category}</b></p>
      <p className={cn('property')}>{localize('productionYear')}: <b>{details.edition}</b></p>
      <p className={cn('total')}>{localize('price')}: {numberFormat(details.price, 'ru-RU', {style: 'currency', currency: 'RUB'})}</p>
      <button className={cn('button')} onClick={() => addToBasket(id)}>{localize('add')}</button>
  </div>
  )
}

export default GoodContent