import { memo } from 'react'
import PropTypes from 'prop-types'
import useSelector from '../../store/use-selector'
import { cn as bem } from '@bem-react/classname'
import { numberFormat, plural } from '../../utils'
import './style.css'

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool')

  const select = useSelector((state) => ({
    lang: state.language.lang,
  }))

  return (
    <div className={cn()}>
      <span className={cn('label')}>
        {select.lang === 'ru' ? 'В корзине:' : 'In the basket'}
      </span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: select.lang === 'ru' ? 'товар' : 'product',
              few: select.lang === 'ru' ? 'товара' : 'goods',
              many: select.lang === 'ru' ? 'товаров' : 'goods',
              other: 'goods',
            })} / ${numberFormat(sum)} ${select.lang === 'ru' ? '₽' : '$'}`
          : select.lang === 'ru'
          ? 'пусто'
          : 'empty'}
      </span>
      <button onClick={onOpen}>
        {select.lang === 'ru' ? 'Перейти' : 'Go'}
      </button>
    </div>
  )
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
}

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
}

export default memo(BasketTool)
