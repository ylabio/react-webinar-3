import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function UserItems({authStatus, user, onLogin, onLogout, t}) {
  return (
    <div className='UserItems'>
      {
        authStatus === 'Auth'
        ? <div className='UserItems-Profile'>
            <Link className='UserItems-ProfileLink' to='/profile'>{user.profile.name}</Link>
            <button onClick={onLogout}>{t('auth.logout')}</button>
          </div>
        : <button className='UserItems-entry' onClick={onLogin}>{t('auth.signIn')}</button>
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