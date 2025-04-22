import { memo } from 'react';
import { useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import useSelector from '../../hooks/use-selector';
import { useLocation } from 'react-router-dom';
import CommentLoginMessage from '../../components/comment-login-message';
import PropTypes from 'prop-types';

function InputWrapper({ children }) {

  const location = useLocation();

  const select = {...useSelectorRedux(
    state => ({
      activeCommentId: state.comments.activeCommentId,
    }),
    shallowequal,
  ),
  ...useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
    }))
  };

  if (!select.exists && !select.waiting) {
    return <CommentLoginMessage back={location.pathname} />
  } 
  
  if (!select.exists || select.waiting){
    return <div>Подождите</div>
  } else {
    return <div>{children}</div>
  }
}

InputWrapper.propTypes = {
  children: PropTypes.node,
};



export default memo(InputWrapper);
