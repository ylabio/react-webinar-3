import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Comment from '../../components/comment'
import Spinner from '../../components/spinner';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import useSelector from '../../hooks/use-selector';
import NewComment from '../../components/new-comment';

function CommentsList({ comments, onReply }) {
  const [commentsList, setCommentsList] = useState([]);
  const cn = bem('CommentsList');
  useEffect(() => {
    if (comments.items) {
      setCommentsList(treeToList(listToTree(comments.items), (item, level) => {
        return {
          ...item,
          level: level,
        }
      }).filter(item => item.hasOwnProperty('_id')));
    }
  }, [comments.items]);
  const select = useSelector(state => ({
    exists: state.session.exists
  }));

  // const callbacks = {
  //   // Переход к авторизации
  //   onSignIn: useCallback(() => {
  //     navigate('/login', {state: {back: location.pathname}});
  //   }, [location.pathname]),
  // }

  return (
      <div className={cn()}>
        <div className={cn('title')}>Комментарии ({comments.count})</div>
        {commentsList.map((comment) => (
          <Comment key={comment._id} comment={comment} onReply={onReply} />
        ))}
      {select.exists && <NewComment />
      }
    </div>
  );
}



export default memo(CommentsList);
