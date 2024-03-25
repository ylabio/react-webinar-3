import {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Comment from '../comment';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import Reply from '../reply';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Comments({comments, onReply, commentId, user, exists, onSignIn, article, sendedComment, t}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onReply(null);
    sendedComment && navigate('#' + sendedComment._id);
  }, [sendedComment, comments]);

  const cn = bem('Comments');

  let comments2 = comments.length && treeToList(listToTree(comments.filter(item => !item.isDeleted))[0].children, (item, level) => (
    {_id: item._id, level: level, text: item.text, dateCreate: item.dateCreate, author: item.author}
  ));
  
  return (
    <div className={cn()}>
      <div className={cn('head')}>{t("comments.head")} ({comments2?.length})</div>
      {comments2?.length && comments2.map(comment => <Comment key={comment._id} comment={comment} onReply={onReply} isReply={comment._id===commentId} onSignIn={onSignIn} exists={exists} user={user} t={t}/>)}
      {commentId === null && <Reply commentId={{"_id": article._id, "_type":  "article"}} user={user} exists={exists} onSignIn={onSignIn} onReply={onReply} t={t}/>}
    </div>
  );
}

export default memo(Comments);