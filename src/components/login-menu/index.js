import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function LoginMenu(props) {
  const { user, onSignOut = () => {} } = props;
  const cn = bem('LoginMenu');

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        {user?.profile
          ?
            <>
              <Link to="/profile" className={cn('user')}>{user?.profile?.name}</Link>
              <div className={cn('btn')} onClick={onSignOut}>Выход</div>
            </>
          :
            <>
              <Link to="/login" className={cn('btn')}>Вход</Link>
            </>
          }
      </div>
    </div>
  );
}

LoginMenu.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  onSignOut: PropTypes.func,
};

export default memo(LoginMenu);
