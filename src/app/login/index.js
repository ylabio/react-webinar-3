import { memo, useState } from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import PageLayout from '../../components/page-layout';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!login || !password) {
      setError('Введите логин и пароль');
      return;
    }

    setError('');
    console.log('Логин:', login, 'Пароль:', password);
    // следующая итерация — отправка запроса
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Вход</h1>
        <Input value={login} onChange={val => setLogin(val)} placeholder="Логин" />
        <Input
          value={password}
          onChange={val => setPassword(val)}
          placeholder="Пароль"
          type="password"
        />
        <Button type="submit" title="Войти" />
        {error && <div className="error-text">{error}</div>}
      </form>
    </PageLayout>
  );
}

export default memo(LoginPage);
