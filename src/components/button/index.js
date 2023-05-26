import { memo } from 'react'
import PropTypes from 'prop-types'
import './style.css'

function Button(props) {
  return (
      <button
        onClick={() => props.onClickButton(props.page)}
        className={`Button 
                    ${props.selectedPage === props.page && 'Button-active'}
                    ${props.ellipsis === 'start' && 'Button-ellipsis-start'}
                    ${props.ellipsis === 'end' && 'Button-ellipsis-end'}`}>
        {props.page}
      </button>
  )
}

Button.propTypes = {
  onClickButton: PropTypes.func,
  page: PropTypes.number,
  selectedPage: PropTypes.number,
  ellipsis: PropTypes.string,
}

Button.defaultProps = {
  onClickButton: () => {},
}

export default memo(Button)
