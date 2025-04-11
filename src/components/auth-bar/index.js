import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function AuthBar({ buttonTitle, userTitle, onClickButton = () => {} }) {
  const cn = bem('AuthBar');

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        {userTitle ? 
          <Link to='/profile'>{userTitle}</Link>
          :
          null
        }
        <Button style='auth' title={buttonTitle} onClick={onClickButton}></Button>
      </div>
    </div>
  );
}

AuthBar.propTypes = {
  buttonTitle: PropTypes.string,
  onClickButton: PropTypes.func,
};

export default memo(AuthBar);
