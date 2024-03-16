import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Form(props) {
  const cn = bem('Form');
  const {
    onFormSubmit,
    error,
    errorMessage,
    formData,
    title,
    submitBtnTitle,
    children
  } = props;

  console.log(formData);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onFormSubmit(formData);
  }

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
  onFormSubmit: () => {}
}

export default memo(Form);