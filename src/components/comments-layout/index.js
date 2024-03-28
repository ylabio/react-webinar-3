import {memo} from 'react'
import PropTypes from 'prop-types';
import './style.css'

const CommentsLayout = ({children}) => {
  return (
    <div className='CommentsLayout'>
      {children}
    </div>
  )
}

CommentsLayout.propTypes = {
  children: PropTypes.node
}

export default memo(CommentsLayout)