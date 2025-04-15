import Input from '../input';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginForm({ login, password, error, onChangeLogin, onChangePassword, onSubmit }) {
    const cn = bem('LoginForm');
    return (
        <form className={cn()} onSubmit={onSubmit}>
            <h2 className={cn('title')}>Вход</h2>
            <div className={cn('prop-wrapper')}>
                <div className={cn('prop')}>
                    <div className={cn('label')}>Логин:</div>
                    <Input value={login} onChange={onChangeLogin} placeholder="Введите логин" />
                </div>
                <div className={cn('prop')}>
                    <div className={cn('label')}>Пароль:</div>
                    <Input value={password} onChange={onChangePassword} placeholder="Введите пароль" type="password" />
                </div>
                <div className={cn('error')}>{error}</div>
            </div>
            <Button style="primary" type="submit" title="Войти" />
        </form>
    );
}

export default LoginForm;
