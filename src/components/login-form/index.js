import { useState, memo } from 'react';
import PropTypes from 'prop-types';
// import { cn as bem } from '@bem-react/classname';
// import { Link } from 'react-router-dom';
// import { numberFormat } from '../../utils';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginForm(props) {
  const { username, password, error, setUsername, setPassword, signIn = () => {} } = props;
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Логин: ', username);
    console.log('Пароль: ', password);
    // login(username, password);
    signIn(username, password);
  };

  // const callbacks = {
  //   onSignIn: (username, password) => signIn({ username, password }),
  // };
  
    async function login(username, password) {
      const response = await fetch('/api/v1/users/sign', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login: username, password: password }),
      });

      if (response.ok) {
          const data = await response.json();
          // Сохраняем токен в localStorage
          // localStorage.setItem('X-Token', data.token);
          
          // Перенаправляем на страницу профиля или другую страницу
          // window.location.href = '/profile';
          console.log('Data after login', data);
          // token = data.token;
          setToken(data.result.token);
          console.log('Пытаюсь использовать токен', data.result.token);
          // window.location.href = '/profile';
      } else {
          // Обработка ошибки (например, неверные учетные данные)
          console.error('Ошибка авторизации');
      }
    };
    
    const handleSignOut = () => {
      signOut(token);
    };

    // async function signOut(token) {
    //   // const token = `6c17ddecd82fd1701b6b9423ce5606056674bed888598e38dd2624c51c8b1268`;
    //   console.log('Используемый токен', token);
    //   const response = await fetch('/api/v1/users/sign', {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-Token': token,
    //     },
    //   });
    //   // const data = await response.json();
    //   if (response.ok) {
    //       // const data = await response.json();
    //       // Сохраняем токен в localStorage
    //       // localStorage.setItem('X-Token', data.token);
          
    //       // Перенаправляем на страницу профиля или другую страницу
    //       // window.location.href = '/profile';
    //       console.log('Успешный выход');
    //       // window.location.href = '/profile';
    //   } else {
    //       // Обработка ошибки (например, неверные учетные данные)
    //       const errorData = await response.json();
    //       console.error('Ошибка при выходе:', response.status, errorData);
    //   }
    // };

  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        Вход
      </div>
      <form className={cn('form')} onSubmit={handleSubmit}>
        <div className={cn('inputs')}>
          <label htmlFor="username">Логин</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Введите логин"
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={cn('inputs')}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Введите пароль"
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error &&
            <label className={cn('error')}>{error}</label>
          }
        </div>
        <Button style="primary" type="submit" title="Войти" />
      </form>
    </div>
  );
}

// Item.propTypes = {
//   item: PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     title: PropTypes.string,
//     price: PropTypes.number,
//   }).isRequired,
//   link: PropTypes.string,
//   onAdd: PropTypes.func,
//   labelCurr: PropTypes.string,
//   labelAdd: PropTypes.string,
// };

export default memo(LoginForm);
