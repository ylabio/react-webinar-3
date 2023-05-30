import { memo } from 'react'
import PropTypes from 'prop-types'
import useSelector from '../../store/use-selector'
import { cn as bem } from '@bem-react/classname'
import { numberFormat } from '../../utils'
import './style.css'

function BasketTotal({ sum }) {
  const cn = bem('BasketTotal')

  const select = useSelector((state) => ({
    lang: state.language.lang,
  }))

  return (
    <div className={cn()}>
      <span className={cn('cell')}>
        {select.lang === 'ru' ? 'Итого' : 'Total'}
      </span>
      <span className={cn('cell')}>
        {numberFormat(sum)} {select.lang === 'ru' ? '₽' : '$'}
      </span>
      <span className={cn('cell')}></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
}

BasketTotal.defaultProps = {
  sum: 0,
}

export default memo(BasketTotal)
