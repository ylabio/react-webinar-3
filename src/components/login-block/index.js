import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from '../input';
import Button from '../button';

function LoginBlock(props) {
  const { t = text => text, data, onChange, onSubmit, errorMessage } = props;
  const cn = bem('LoginBlock');

  return (
    <div className={cn()}>
      <div className={cn('title')}>Вход</div>
      <form onSubmit={onSubmit} className={cn('form')}>
        <div className={cn('inputs')}>
          <div className={cn('input__container')}>
            <label htmlFor="login" className={cn('label')}>
              Логин
            </label>
            <Input
              id="login"
              type={'text'}
              name={'login'}
              value={data.login}
              onChange={onChange}
              placeholder={t('Введите логин')}
              delay={0}
            />
          </div>
          <div className={cn('input__container')}>
            <label htmlFor="password" className={cn('label')}>
              Пароль
            </label>
            <Input
              id="password"
              type={'password'}
              name={'password'}
              value={data.password}
              onChange={onChange}
              placeholder={t('Введите пароль')}
              delay={0}
              autoComplete={'off'}
            />
          </div>
          {errorMessage && <div className={cn('error')}>{errorMessage}</div>}
        </div>
        <Button
          style={'primary'}
          type={'submit'}
          title={t('Войти')}
          disabled={!data.login || !data.password}
        />
      </form>
    </div>
  );
}

LoginBlock.propTypes = {
  data: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string,
  }),
  t: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default memo(LoginBlock);
