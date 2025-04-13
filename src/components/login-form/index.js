import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../form-input';
import Button from '../button';
import './style.css';

function LoginForm({
  onSubmit,
  header,
  loginLabel,
  passwordLabel,
  buttonMessage,
  passwordPlaceholder,
  loginPlaceholder,
}) {
  const cn = bem('LoginForm');
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    setErrors([]); // Очищаем ошибки перед запросом
    setIsSubmitting(true);
    try {
      const formData = new FormData(event.target);
      const credentials = Object.fromEntries(formData.entries());
      const success = await onSubmit(credentials);
      await new Promise(resolve => setTimeout(resolve, 50));
      if (success) {
        navigate('/profile');
      }
    } catch (error) {
      try {
        const errorMessage = error.message;
        const jsonString = errorMessage.startsWith('Error: ')
          ? errorMessage.replace('Error: ', '')
          : errorMessage;
        const errorData = JSON.parse(jsonString);

        setErrors(errorData.issues || ['Ошибка авторизации']);
      } catch (parseError) {
        setErrors(['Ошибка авторизации']);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn()}>
      <h1>{header}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder={loginPlaceholder}
          className={cn('input')}
          name="login"
          id="login"
          label={loginLabel}
          required
        />
        <Input
          type="password"
          placeholder={passwordPlaceholder}
          className={cn('input')}
          name="password"
          id="password"
          label={passwordLabel}
          required
        />
        <div className={cn('errors')}>
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={index}>
                  <p>{typeof error === 'object' ? error.message : error}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={cn('actions')}>
          <Button
            type="submit"
            style="primary"
            title={isSubmitting ? 'Проверка...' : buttonMessage}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  header: PropTypes.string,
  loginLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  buttonMessage: PropTypes.string,
};

export default memo(LoginForm);
