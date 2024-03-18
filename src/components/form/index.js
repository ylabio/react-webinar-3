import {cn as bem} from '@bem-react/classname'
import React, { memo } from 'react'
import PropTypes from 'prop-types';
import './style.css';

function Form({children, title, error, btnTitle, className, onSubmit} ) {

  const cn = bem(className + ' form');

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2 className={cn('title')}>{title}</h2>
        {React.Children.map(children, (child) => (
          <div key={child.key} className={cn('item')}>{child}</div>
        ))}      
      {error  && <div className={cn('error')}>{error.message}</div>}
      <button className={cn('btn')} type='submit'>{btnTitle}</button>
    </form>
  )
}

Form.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }),
  onSubmit: PropTypes.func,
  children: PropTypes.node,
}

Form.defaultProps = {
  onSubmit: () => {},
}

export default memo(Form);