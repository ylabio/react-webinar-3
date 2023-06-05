import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function UserItems({authStatus, user, onLogin, onLogout, t}) {
  const cn = bem('User');
  return (
    <div className={cn('wrapper')}>
      {
        authStatus === 'Auth'
        ? <div >
          
            <Link className={cn('link')} to='/profile'>{user.profile.name}</Link>
            <button onClick={onLogout}>{t('auth.logout')}</button>
          </div>
        : <button  onClick={onLogin}>{t('auth.signIn')}</button>
      }
    </div>
  );
}

UserItems.propTypes = {
  authStatus: PropTypes.string.isRequired,
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string
    })
  }),
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  t: PropTypes.func
}


export default UserItems;