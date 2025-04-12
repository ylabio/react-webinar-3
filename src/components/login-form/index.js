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
      <Input value={login} onChange={setLogin} placeholder="Логин" delay={1000}
        theme={'small'} />
      <Input value={password} onChange={setPassword} type="password" delay={1000}
        theme={'small'} />
      {issues && <div className={cn("error")}>{issues}</div>}
      <Button type="submit" disabled={waiting} style="primary">
        {waiting ? 'Загрузка...' : 'Войти'}
      </Button>
    </form>
  );
}

export default memo(LoginForm);
