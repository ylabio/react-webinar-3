import { memo, useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import useSelector from "../../hooks/use-selector";
import User from "../../store/user";
import UserData from "../user-data";
function Authorization() {
  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/v1/users/sign', {
        login: login,
        password: password
      });
      console.log(response);
      setUser(response.data.result.user);
      console.log('User signed in successfully');
    } catch (error) {
      const er = error.response.data.error;
      let msg = er.message;
      if ('data' in er) {
        const {data} = er;
        if ('issues' in data) {
          const {issues} = data;
          msg += ': ' + issues.map(x => x.message).join(', ');
        }
      }
      setError(msg); // Предполагается, что сервер возвращает сообщение об ошибке в поле "message"
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
        {error && <div className="error" >{error}</div>}
        <button className="auth-button" type="submit">Войти</button>
      </form>
      <UserData user={user}/>
    </div>
  );
}

export default memo(Authorization);
