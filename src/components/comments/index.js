import useStore from "../../hooks/use-store";
import List from "../list";
import {memo, useCallback, useEffect} from "react";
import Comment from "../comment";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CommentForm from "../comment-form";
import {useDispatch} from "react-redux";
import commentsActions from '../../store-redux/comments/actions';

function Comments({comments, count, itemId, waiting}) {
  const store = useStore();

  const dispatch = useDispatch();

  const cn = bem('Comments');
  console.log(comments)

  const addComment = (comment) => {
    dispatch(commentsActions.postComment({
      text: comment,
      dateCreate: new Date().getDate()
    }))
  }
  //
  // useInit(() => {
  //   dispatch(commentsActions.loadComments(itemId))
  // }, [itemId]);

  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии ({count})</div>

      {comments && comments.length !== 0
        ? <div className={cn('list')}>
          {comments.map((item) => (<Comment item={item} /> ))}
        </div>
        : <div>Нет комментариев</div>
      }

      <CommentForm handleSubmit={addComment} waiting={waiting} />

    </div>
  );
}

export default memo(Comments);