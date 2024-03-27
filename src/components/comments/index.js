import {memo, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Comment from '../comment';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import Reply from '../reply';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import preparePlacesForReply from '../../utils/prepare-places-for-reply';

function Comments({comments, onReply, commentId, user, exists, onSignIn, article, t, newComment}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onReply(null);
    newComment && navigate('#comment-' + newComment);
  }, [newComment, comments]);

  useEffect(() => {
    comments.length && setTimeout(() => 
      document.querySelector(window.location.hash.startsWith('#comment-') && window.location.hash.match(/[A-Za-z0-9]/) ? 
        window.location.hash : '#null')
      ?.scrollIntoView()
    );
  }, [comments]);

  const cn = bem('Comments');

  let commentsWithLevels = useMemo(() => comments.length && treeToList(listToTree(comments.filter(item => !item.isDeleted))[0].children, (item, level) => (
    {_id: item._id, level: level, text: item.text, dateCreate: item.dateCreate, author: item.author}
  )), [comments]);

  let placesForReply = useMemo(() => {
    return comments.length && preparePlacesForReply(listToTree(comments.filter(item => !item.isDeleted))[0].children);
  }, [comments]);
  
  return (
    <div className={cn()}>
      <div className={cn('head')}>{t("comments.head")} ({commentsWithLevels?.length})</div>
      {commentsWithLevels?.length && commentsWithLevels.map(comment => <Comment key={comment._id} commentId={{"_id": commentId, "_type": "comment"}} comment={comment} onReply={onReply} isReply={comment._id===placesForReply[commentId]} onSignIn={onSignIn} exists={exists} user={user} t={t}/>)}
      {commentId === null && <Reply commentId={{"_id": article._id, "_type":  "article"}} user={user} exists={exists} onSignIn={onSignIn} onReply={onReply} t={t}/>}
    </div>
  );
}

export default memo(Comments);