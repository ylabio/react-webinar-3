import { cn } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';
import Input from '../input';

const LoginForm = ({ t = () => {}, onSubmit = () => {}, data, onChange = () => {}, error }) => {
  const loginForm = cn('LoginForm');

  return (
    <div className={loginForm()}>
      <h2>{t('form.title')}</h2>
      <form onSubmit={onSubmit}>
        <div className={loginForm('element')}>
          <label htmlFor="login">{t('form.login')}</label>
          <Input
            name="login"
            value={data.login}
            onChange={onChange}
            placeholder={'Введите логин'}
            delay={0}
          />
        </div>
        <div className={loginForm('element')}>
          <label htmlFor="password">{t('form.password')}</label>
          <Input
            placeholder={'Введите пароль'}
            value={data.password}
            onChange={onChange}
            type="password"
            name="password"
            delay={0}
          />
        </div>
        <div className={loginForm({ error: 'message' })}>{error ? error : null}</div>
        <Button type="submit" title={t('form.btn')} style="primary" />
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  error: PropTypes.string,
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  data: PropTypes.object,
};

export default LoginForm;
