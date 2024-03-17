import { memo, useState, useEffect } from "react";
import "./style.css";
import useStore from "../../hooks/use-store";
import axios from "axios";
import useSelector from "../../hooks/use-selector";
import User from "../../store/user";
function Authorization() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/users/sign', {
        login: login,
        password: password
      });
      console.log('User signed in successfully');
    } catch (error) {
      setError(error.response.data.message); // Предполагается, что сервер возвращает сообщение об ошибке в поле "message"
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Поля для ввода логина и пароля */}
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Войти</button>
      </form>
      
      {error && <div>{error}</div>}
    </div>
  );
}

export default memo(Authorization);
