import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import './style.css';

function ReplyLine({id, link, onCancel, t}) {
  const cn = bem('ReplyLine');

  return (
    <p className={cn('')}><Link to={link}>{t('comments.replyLogin')}</Link>, {id ? t('comments.replyMessage') : t('comments.commentMessage')}. {id && 
      <span className={cn('cancel')} onClick={onCancel}>{t('comments.cancel')}</span>}
    </p>
  )
}

ReplyLine.propTypes = {
  link: PropTypes.string,
  id: PropTypes.string,
  onCancel: PropTypes.func,
  t: PropTypes.func,
};

ReplyLine.defaultProps = {
  link: '/login',
  id: '',
  onCancel: () => {},
  t: () => {},
}

export default memo(ReplyLine);
