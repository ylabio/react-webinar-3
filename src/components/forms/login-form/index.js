import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import Input from "../../input";
import Button from "../../button";
import './style.css';

function LoginForm({ login, password, error, onChangeLogin, onChangePassword, onSubmit, isLoading }) {
  const cn = bem('Login-Form');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h2 className={cn("caption")}>Вход</h2>

      <label>
        <span>Логин</span>
        <Input
          value={login}
          onChange={onChangeLogin}
          placeholder="Введите логин"
          delay={300}
          theme="small"
          type="text"
        />
      </label>

      <label>
        <span>Пароль</span>
        <Input
          value={password}
          onChange={onChangePassword}
          placeholder="Введите пароль"
          delay={300}
          theme="small"
          type="password"
        />
      </label>

      {error && <p className={cn("error")}>{error}</p>}

      <Button style="primary" title="Войти" type="submit"  disabled={isLoading}/>
    </form>
  );
}

export default memo(LoginForm);
