import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './style.css'

const Form = ({title, inputs, sumbitAction, errorMessage, buttonTitle }) => {
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
            <label className='Form-label' htmlFor={input.id}>{input.label}</label>
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

export default Form;


