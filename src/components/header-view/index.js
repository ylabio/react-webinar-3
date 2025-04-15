import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function HeaderView({ user, onLogout }) {
    const cn = bem('Header');

    return (
        <div className={cn()}>
            <div className={cn('wrapper')}>
                {!user ? (
                    <Link className={cn('log')} to="/login">Вход</Link>
                ) : (
                    <div className={cn('user')}>
                        <Link className={cn('user-name')} to="/profile">{user.name}</Link>
                        <Link className={cn('log')} to="/" onClick={onLogout}>Выход</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

HeaderView.propTypes = {
    user: PropTypes.object,
    onLogout: PropTypes.func.isRequired
};

export default memo(HeaderView);