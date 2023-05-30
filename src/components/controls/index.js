import { memo } from 'react'
import PropTypes from 'prop-types'
import useSelector from '../../store/use-selector'
import './style.css'

function Controls({ onAdd }) {
  const select = useSelector((state) => ({
    lang: state.language.lang,
  }))

  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>
        {select.lang === 'ru' ? 'Добавить' : 'Add'}
      </button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
}

Controls.defaultProps = {
  onAdd: () => {},
}

export default memo(Controls)
