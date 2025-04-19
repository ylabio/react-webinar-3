import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function AuthMessage(props) {
  const cn = bem('AuthMessage');
  const { t = text => text } = props;

  return (
    <div className={cn('')}>
      <Link to={'/login'} className={cn('link')}>
        {t('comment.message-link')}
      </Link>
      {`, ${t('comment.message-text')}`}
    </div>
  );
}

AuthMessage.propTypes = {
  t: PropTypes.func,
};

export default memo(AuthMessage);
