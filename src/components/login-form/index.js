import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
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
  errors,
  isSubmitting,
}) {
  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <h1>{header}</h1>
      <form onSubmit={onSubmit}>
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
  errors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  isSubmitting: PropTypes.bool,
};

LoginForm.defaultProps = {
  errors: [],
  isSubmitting: false,
};

export default memo(LoginForm);
