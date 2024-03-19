import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function FormLayout({children, btnLabel, onSubmit, error}) {

  const cn = bem('FormLayout')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      {children}
      {error && <div className={cn('error')}>{error}</div>}
      <div>
        <button type='submit'>{btnLabel}</button>
      </div>
    </form>
  )
}

FormLayout.PropTypes = {
  children: PropTypes.node,
  btnLabel: PropTypes.string,
  onSubmit: PropTypes.func,
  error: PropTypes.string
}

FormLayout.defaultProps = {
  onSubmit: () => {}
}

export default React.memo(FormLayout);