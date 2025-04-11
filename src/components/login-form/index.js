import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useSelector from '../../hooks/use-selector';
import Button from '../../components/button';
import Input from '../../components/input';
import './style.css';

function LoginForm({ children }) {
  const cn = bem('LoginForm');
  return (
    <form className={cn()} action="#">
      <h2 className={cn("caption")}>Вход</h2>
      <label>
        <span>Логин</span>
        <Input
          value=""
          onChange={() => {}}
          placeholder={'Введите логин'}
          delay={1000}
          theme={'small'}
          type="text"
        />
      </label>
      <label>
        <span>Пароль</span>
        <Input
          value=""
          onChange={() => {}}
          placeholder={'Введите пароль'}
          delay={1000}
          theme={'small'}
          type="password"
        />
      </label>
      <p className={cn("error")}>Текст ошибки от сервера</p>
      <Button style="primary" onClick={() => {}} title="Войти" type="submit"/>
    </form>
  );
}

LoginForm.propTypes = {
  children: PropTypes.node,
};

export default memo(LoginForm);
