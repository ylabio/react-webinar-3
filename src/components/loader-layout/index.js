import React from 'react'
import PropTypes from 'prop-types';
import './style.css';

function LoaderLayout({children, isError, isLoading, localize}) {
  return (
    !isLoading && !isError ? children 
    : <span className='Load-statuses'>{isError ? localize('error') : localize('loading')}</span>
  )
}

LoaderLayout.propTypes = {
  children: PropTypes.node,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  localize: PropTypes.func
}

LoaderLayout.defaultProps = {
  localize: () => {}
}

export default React.memo(LoaderLayout);