import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import './style.css';

function LoginInvite({link, isRoot, onCancel}) {
  const cn = bem('LoginInvite');

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };
  return (
    <div className={cn({root: isRoot})}>
      <Link
        className={cn('link')}
        to={link}
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
  isRoot: PropTypes.bool,
  onCancel: PropTypes.func,
};

LoginInvite.defaultProps = {
  onCancel: () => {},
};

export default memo(LoginInvite);
