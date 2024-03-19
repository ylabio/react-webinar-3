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
  const [user, setUser] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/users/sign', {
        login: login,
        password: password
      });
      setUser(response.data.user);
      console.log('User signed in successfully');
    } catch (error) {
      setError(error.response.data.message); // Предполагается, что сервер возвращает сообщение об ошибке в поле "message"
    }
  };

  return (
    <div>
      <div><h2 className="auth-h2">Вход</h2></div>
      <form onSubmit={handleSubmit}>
        <label className="auth-label1" htmlFor="email">Email</label>
        <input className="auth-input" type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        <label className="auth-label" htmlFor="email">Password</label>
        <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="auth-button" type="submit">Войти</button>
      </form>
      {user && (
  <div>
    <p>Имя: {user.name}</p>
    <p>Телефон: {user.phone}</p>
    <p>Email: {user.email}</p>
  </div>
)}
      {error && <div>{error}</div>}
    </div>
  );
}

export default memo(Authorization);
