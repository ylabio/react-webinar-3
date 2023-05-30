import PropTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Pagination(props) {
  const cn = bem('Pagination')

  const numberPages = Math.ceil(props.length / props.limit)

  const btnPage = []

  for (let i = 1; i <= numberPages; i++) {
    btnPage.push(
      <button
        className={i === props.currentPage ? cn('btn active') : cn('btn')}
        key={i}
        onClick={() => callbacks.onChangePage(i)}
      >
        {i}
      </button>
    )
  }

  const callbacks = {
    onChangePage: (i) => props.onChangePage(i),
  }

  switch (props.currentPage) {
    case 1:
      return (
        <div className={cn()}>
          {btnPage[props.currentPage - 1]}
          {btnPage[props.currentPage]}
          {btnPage[props.currentPage + 1]}
          <span>...</span>
          {btnPage[numberPages - 1]}
        </div>
      )

    case 2:
      return (
        <div className={cn()}>
          {btnPage[props.currentPage - 2]}
          {btnPage[props.currentPage - 1]}
          {btnPage[props.currentPage]}
          <span>...</span>
          {btnPage[numberPages - 1]}
        </div>
      )

    case 3:
      return (
        <div className={cn()}>
          {btnPage[props.currentPage - 3]}
          {btnPage[props.currentPage - 2]}
          {btnPage[props.currentPage - 1]}
          {btnPage[props.currentPage]}
          <span>...</span>
          {btnPage[numberPages - 1]}
        </div>
      )

    case numberPages - 1:
      return (
        <div className={cn()}>
          {btnPage[0]}
          <span>...</span>
          {btnPage[props.currentPage - 2]}
          {btnPage[props.currentPage - 1]}
          {btnPage[props.currentPage]}
        </div>
      )

    case numberPages:
      return (
        <div className={cn()}>
          {btnPage[0]}
          <span>...</span>
          {btnPage[props.currentPage - 2]}
          {btnPage[props.currentPage - 1]}
          {btnPage[props.currentPage]}
        </div>
      )

    default:
      return (
        <div className={cn()}>
          {btnPage[0]}
          <span>...</span>
          {btnPage[props.currentPage - 2]}
          {btnPage[props.currentPage - 1]}
          {btnPage[props.currentPage]}
          <span>...</span>
          {btnPage[numberPages - 1]}
        </div>
      )
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  length: PropTypes.number,
  limit: PropTypes.number,
  onChangePage: PropTypes.func,
}

Pagination.defaultProps = {
  onChangePage: () => {},
}

export default Pagination
