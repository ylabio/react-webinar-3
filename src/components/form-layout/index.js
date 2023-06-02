import {memo} from 'react';
import PropTypes from "prop-types";
import './style.css';

function FormLayout({children, handleSubmit, t}) {
  return (
    <form className='Form-layout'>
        {children}

        <input type='submit' onClick={handleSubmit} value={t('loginForm.submit')} />
    </form>
  )
}

FormLayout.propTypes = {
  children: PropTypes.node,
  handleSubmit: PropTypes.func,
  t: PropTypes.func
}

FormLayout.defaultProps = {
  handleSubmit: () => {},
  t: () => {}
}

export default memo(FormLayout)