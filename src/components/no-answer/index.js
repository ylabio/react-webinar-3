import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';

import './style.css';
import { Link, useLocation } from 'react-router-dom';

function NoAnswer({type, onCancel, state}) {
  const cn = bem('NoAnswer');
  const location = useLocation();

  let answer = 'комментировать'
  if (type === 'comment') {
    answer = 'ответить'
  }

  return (
    <div className={cn()}>
      <span><Link to='/login' state={{back: location.pathname}}>Войдите</Link>, чтобы иметь возможность {answer}.</span>
      {type === 'comment' && <button className={cn('btn')} onClick={onCancel}>Отмена</button>}
    </div>
  )
}

export default memo(NoAnswer);

NoAnswer.propTypes = {
  type: PropTypes.oneOf(['comment', 'article']),
  onCancel: PropTypes.func,
  state: PropTypes.string
};

NoAnswer.defaultProps = {
  type: 'article',
  onCancel: () => {},
  state: '/'
}
