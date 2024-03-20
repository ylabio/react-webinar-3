import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import './style.css'

const Form = ({title, inputs, sumbitAction, errorMessage, buttonTitle}) => {

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    if (errorMessage) {
      setShowErrorMessage(true);
      const timeout = setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault()
    sumbitAction(formValues)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className='Form-container'>
      <h2 className='Form-title'>{title}</h2>
      <form autoComplete='on' className='Form' onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <div key={input.id} className='Form-input-container'>
            <label className='Form-label' htmlFor={input.id}>{input.label}</label>
            <input
              onChange={handleInputChange}
              required={input.validationConfig.required}
              minLength={input.validationConfig.minLength}
              maxLength={input.validationConfig.maxLength}
              id={input.id}
              name={input.id}
              autoComplete={input.autoComplete}
              type={input.type}
              className='Form-input'
            />
          </div>
        ))}
        {showErrorMessage ? (
          <span className='Form-submit-error'>{errorMessage}</span>
        ): ''}
        <button className='Form-buttom' type='submit'>{buttonTitle}</button>
      </form>
    </div>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      autoComplete: PropTypes.string,
      validationConfig: PropTypes.shape({
        required: PropTypes.bool,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
      }),
    })
  ).isRequired,
  errorMessage: PropTypes.string,
  submitAction: PropTypes.func,
  buttonTitle: PropTypes.string,
};

Form.defaultProps = {
  sumbitAction: () => {},
}

export default memo(Form);


