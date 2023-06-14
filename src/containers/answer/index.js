import { memo } from 'react'
import PropTypes from 'prop-types';
import NoAnswer from '../../components/no-answer'
import AnswerForm from '../../components/answer-form';
import { useLocation } from 'react-router-dom';

function Answer({exist, type, onCancel, onSend}) {
  const location = useLocation();
  
  if (exist) {
    return <AnswerForm onSend={onSend} onCancel={onCancel} type={type}/>
  } else {
    return <NoAnswer type={type} onCancel={onCancel} state={location.pathname}/>
  }
}

export default memo(Answer);

Answer.propTypes = {
  exist: PropTypes.bool,
  type: PropTypes.oneOf(['comment', 'article']),
  onSend: PropTypes.func,
  onCancel: PropTypes.func,
};

Answer.defaultProps = {
  exist: false,
  type: 'article',
  onSend: () => {},
  onCancel: () => {},
}
