import PropTypes from 'prop-types'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Navigation = ({ link, title }) => {
  return (
    <div className='Navigation'>
      <Link to={link} >
        <span className='lng-main'>{title}</span>
      </Link>
    </div>
  )
}

Navigation.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string
}

export default memo(Navigation);
