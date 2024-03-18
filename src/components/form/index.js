import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import './style.css'

const Form = ({title, inputs, sumbitAction, errorMessage, buttonTitle, t}) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onTouched' });

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShowErrorMessage(true);
      const timeout = setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  const onSubmit = (data) => {
    sumbitAction(data)
  }

  return (
    <div className='Form-container'>
      <h2 className='Form-title'>{title}</h2>
      <form autoComplete='on' className='Form' onSubmit={handleSubmit(onSubmit)}>
        {inputs.map((input) => (
          <div key={input.id} className='Form-input-container'>
            <label className='Form-label' htmlFor={input.id}>{t(input.label)}</label>
            <input
              id={input.id}
              name={input.id}
              autoComplete={input.autoComplete}
              type={input.type}
              {...register(input.id, input.validationConfig)}
              className='Form-input'
            />
              <span className='Form-error'>{errors[input.id]?.message}</span>
          </div>
        ))}
        {showErrorMessage ? (
          <span className='Form-submit-error'>{errorMessage}</span>
        ): ''}
        <button className='Form-buttom' disabled={!isValid} type='submit'>{buttonTitle}</button>
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
        required: PropTypes.string,
        minLength: PropTypes.shape({
          value: PropTypes.number,
          message: PropTypes.string,
        }),
        maxLength: PropTypes.shape({
          value: PropTypes.number,
          message: PropTypes.string,
        }),
      }),
    })
  ).isRequired,
  errorMessage: PropTypes.string,
  submitAction: PropTypes.func,
  buttonTitle: PropTypes.string,
  t: PropTypes.func,
};

Form.defaultProps = {
  sumbitAction: () => {},
  t: (text) => text
}

export default Form;


