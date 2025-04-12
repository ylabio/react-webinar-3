import { memo, useState} from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import Button from '../../components/button';
import Input from '../../components/input';
import './style.css';

function LoginForm() {

  const cn = bem('LoginForm');
  const store = useStore();
  const { issues, waiting } = useSelector(state => state.auth);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    store.actions.auth.signIn(login, password);
  };
  return (
    <form onSubmit={handleSubmit} className={cn()} >
      <h2 className={cn("caption")}>Вход</h2>
      <label>
        <span>Логин</span>
        <Input value={login} onChange={setLogin} type="text" placeholder="Введите логин" delay={1000}
          theme={'small'} />
      </label>
      <label>
      <span>Пароль</span>
        <Input value={password} onChange={setPassword} type="password" placeholder="Введите пароль" delay={1000}
          theme={'small'} />
      </label>
      {issues && <div className={cn("error")}>{issues}</div>}
      <Button type="submit" disabled={waiting} style="primary" title={waiting ? 'Загрузка...' : 'Войти'}/>
    </form>
  );
}

export default memo(LoginForm);
