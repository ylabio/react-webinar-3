import { memo, useMemo, useCallback } from 'react';
import useTranslate from '../../hooks/use-translate';
import Item from '../../components/item';
import Spinner from '../../components/spinner';
import Comment from '../../components/comment';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import listToTree from '../../utils/list-to-tree';
import commentsFormat from '../../utils/comments-format';
import treeToList from '../../utils/tree-to-list';
import shallowequal from 'shallowequal';
import CommentInput from '../../components/comment-input';
import Form from '../../components/form';
import SideLayout from '../../components/side-layout';
import CommentsLayout from '../../components/comments-layout';
import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';
import { Link, useLocation } from 'react-router-dom';
import CommentLoginMessage from '../../components/comment-login-message';

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
    return <div style={{marginTop: '8px'}}>{children}</div>
  }
}

export default memo(InputWrapper);
