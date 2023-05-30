import { memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import useSelector from '../../store/use-selector'
import { numberFormat } from '../../utils'
import './style.css'

function Item(props) {
  const cn = bem('Item')

  const select = useSelector((state) => ({
    lang: state.language.lang,
  }))

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
  }

  return (
    <div className={cn()}>
      <Link to={`/products/${props.item._id}`} className={cn('title')}>
        <div>{props.item.title}</div>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormat(props.item.price)} {select.lang === 'ru' ? '₽' : '$'}
        </div>
        <button onClick={callbacks.onAdd}>
          {select.lang === 'ru' ? 'Добавить' : 'Add'}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item)
