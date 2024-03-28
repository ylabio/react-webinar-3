import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {useLocation, Link} from 'react-router-dom';
import './style.css';

function LoginInvite({link, isRoot, onCancel, anchor}) {
  const cn = bem('LoginInvite');

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };
  const location = useLocation();

  return (
    <div className={cn({root: isRoot})}>
      <Link
        autoFocus={true}
        className={cn('link')}
        to={link}
        state={{back: location.pathname + '#' + anchor}}
      >
        Войдите
      </Link>
      <span className={cn('text')}>, чтобы иметь возможность комментировать&nbsp;</span>
      {!isRoot && (
        <a
          className={cn('cancel')}
          onClick={handleCancel}
          href=''
          role='button'
        >
          Отмена
        </a>
      )}
    </div>
  );
}

LoginInvite.propTypes = {
  link: PropTypes.string,
  anchor: PropTypes.string,
  isRoot: PropTypes.bool,
  onCancel: PropTypes.func,
};

LoginInvite.defaultProps = {
  onCancel: () => {},
};

export default memo(LoginInvite);
