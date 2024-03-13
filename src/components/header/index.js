import PropTypes from 'prop-types'
import { memo } from 'react'
import 'style.css'
const Header = ({children}) => {
  return (
    <div className={'Header'}>
      {children}
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node
}

export default memo(Header)