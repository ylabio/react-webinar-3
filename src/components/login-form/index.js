import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import './style.css';


function LoginForm() {
  const navigate = useNavigate();
  
  const { t } = useTranslate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkProfile = async (token) => {
    const res = await fetch('/api/v1/users/self?fields=*', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'X-Token': token
      },
      credentials: 'include'
    });
    
    return res.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        let errMsg = 'Ошибка авторизации';
        try {
          const errData = await response.json();


          if (errData.error && errData.error.data && Array.isArray(errData.error.data.issues)) {
            const issuesMessages = errData.error.data.issues.map(issues => issues.message);
            errMsg = issuesMessages.join(', ');
          } else if (errData.error && errData.error.message) {
            errMsg = errData.error.message;
          }
        } catch (jsonError) {
          errMsg = (await response.text()) || errMsg;
        }
        throw new Error(errMsg);
      }
      
      let data;

      try {
        data = await response.json();

        console.log(data)

      } catch (jsonError) {
        const text = await response.text();
        throw new Error(text || 'Ошибка авторизации');
      }

      if (!data.result || !data.result.token) {
        throw new Error('Токен не получен');
      }

      const token = data.result.token;
      const userProfile = data.result.user.profile;
      const email = data.result.user.email;
      
      localStorage.setItem('token', token);
      localStorage.setItem('profile', JSON.stringify(userProfile));
      localStorage.setItem('email', email);

      await checkProfile(token);

      navigate('/');

    } catch (err) {
      setError(err.message);
    }
    
    setLoading(false);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form__title">{t('login.heading')}</h2>

      <div className="login-form__field">
        <label htmlFor="login" className="login-form__label">{t('login.label')}</label>
        <input
          type="text"
          id="login"
          className="login-form__input"
          placeholder="Введите логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>

      <div className="login-form__field">
        <label htmlFor="password" className="login-form__label">{t('login.password.label')}</label>
        <input
          type="password"
          id="password"
          className="login-form__input"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <div className="login-form__error">{error}</div>}

      <button type="submit" id="submit" className="login-form__btn" disabled={loading}>
        {t('login.form.btn')}
      </button>
    </form>
  );
}

export default LoginForm;
