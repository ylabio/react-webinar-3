import {forwardRef, memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import './style.css';

const ReplyLine = forwardRef(({id, link, level, location, onCancel, t}, ref) => {
  const cn = bem('ReplyLine');

  return (
    <p className={cn('')} ref={ref} style={(id && level < 10) ? { paddingLeft: 30} : {}}><Link to={link} state={{back: location}}>{t('comments.replyLogin')}</Link>, {id ? t('comments.replyMessage') : t('comments.commentMessage')}. {id && 
      <span className={cn('cancel')} onClick={onCancel}>{t('comments.cancel')}</span>}
    </p>
  )
})

ReplyLine.propTypes = {
  link: PropTypes.string,
  location: PropTypes.string,
  id: PropTypes.string,
  level: PropTypes.number,
  onCancel: PropTypes.func,
  t: PropTypes.func,
};

ReplyLine.defaultProps = {
  link: '/login',
  location: '/',
  id: '',
  level: 0,
  onCancel: () => {},
  t: () => {},
}

export default memo(ReplyLine);
