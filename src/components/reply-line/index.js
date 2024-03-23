import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import './style.css';

function ReplyLine({id, link, onCancel}) {
  const cn = bem('ReplyLine');

  return (
    <p className={cn('')}><Link to={link}>Войдите</Link>, чтобы иметь возможность ответить. {id && 
      <span className={cn('cancel')} onClick={onCancel}>Отмена</span>}
    </p>
  )
}

ReplyLine.propTypes = {
  link: PropTypes.string,
  id: PropTypes.string,
  onCancel: PropTypes.func,
};

ReplyLine.defaultProps = {
  link: '/login',
  id: '',
  onCancel: () => {}
}

export default memo(ReplyLine);
