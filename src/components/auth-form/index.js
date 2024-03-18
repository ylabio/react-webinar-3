import { memo } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import './style.css';
import useTranslate from "../../hooks/use-translate";
import {cn as bem} from '@bem-react/classname';

function AuthForm({ onSubmit, errorMessage }) {
  const cn = bem('AuthForm');
  const { t } = useTranslate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h2 className={cn('title')}>{t("auth.login")}</h2>
      <div className={cn('group')}>
        <label className={cn('label')} htmlFor="username">{t("auth.log-in")}</label>
        <input
          className={cn('input')}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className={cn('group')}>
        <label className={cn('label')} htmlFor="password">{t("auth.password")}</label>
        <input
          className={cn('input')}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && <div className={cn('error')}>{errorMessage}</div>}
      <button type="submit" className={cn('btn')}>{t("auth.login")}</button>
    </form>
  );
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(AuthForm);
