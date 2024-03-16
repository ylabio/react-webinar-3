import {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Form(props) {
  const cn = bem('Form');
  const {
    onSubmit,
    error,
    errorMessage,
    formData,
    title,
    submitBtnTitle,
    children
  } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(formData);
  }

  useEffect(() => {}, [error, errorMessage])

  return (
    <form onSubmit={handleSubmit} className={cn()}>
      <fieldset className={cn('fieldset')}>
        <legend className={cn('legend')}>{title}</legend>
        {children}
      </fieldset>
        {error && <p className={cn('error')}>{errorMessage}</p>}
      <button type='submit'>{submitBtnTitle}</button>
    </form>
  )
};

Form.propTypes = {
  onFormSubmit: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  title: PropTypes.string,
  formData: PropTypes.object,
  submitBtnTitle: PropTypes.string,
  children: PropTypes.node
}

Form.defaultProps = {
  onFormSubmit: () => {},
  error: false
}

export default memo(Form);