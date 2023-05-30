import { memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useSelector from '../../store/use-selector'
import { cn as bem } from '@bem-react/classname'
import { numberFormat } from '../../utils'
import './style.css'

function ItemBasket(props) {
  const cn = bem('ItemBasket')

  const select = useSelector((state) => ({
    lang: state.language.lang,
  }))

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  }

  return (
    <div className={cn()}>
      <Link to={`/products/${props.item._id}`} className={cn('title')}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(props.item.price)} {select.lang === 'ru' ? '₽' : '$'}
        </div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)}{' '}
          {select.lang === 'ru' ? 'шт' : 'pc.'}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>
            {select.lang === 'ru' ? 'Удалить' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket)
