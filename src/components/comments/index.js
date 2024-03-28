import useStore from "../../hooks/use-store";
import List from "../list";
import {memo, useCallback, useEffect, useState} from "react";
import Comment from "../comment";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CommentForm from "../comment-form";
import {useDispatch} from "react-redux";
import commentsActions from '../../store-redux/comments/actions';
import useSelector from "../../hooks/use-selector";
import {Link} from "react-router-dom";

function Comments({comments, count, itemId, waiting}) {
  const store = useStore();

  const dispatch = useDispatch();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  const select = useSelector(state => ({
    user: state.session.user
  }))

  const cn = bem('Comments');
  console.log(comments)

  const callback = {
    addComment: useCallback((comment, idComment) => {
      dispatch(commentsActions.postComment({
        text: comment.text,
        parent: {
          _id: idComment,
          _type: "comment"
        }
      }))
    }, []),
    onOpenForm: useCallback((id) => {
      setReplyToCommentId(id);
    }, []),
    onCloseForm: useCallback(() => {
      setReplyToCommentId(null);
    }, [])
  }


  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии ({count})</div>

      <div className={cn('list')}>
        {comments.map((item) => (
          <Comment
            item={item}
            isAuth={!!select.user.username}
            onOpenForm={callback.onOpenForm}
            onCloseForm={callback.onCloseForm}
            visibleForm={!!replyToCommentId === item._id}
          />
        ))}
      </div>

      {!!replyToCommentId === itemId &&
        <div className={cn('form')}>
          {!!select.user.username ?
            <CommentForm
              onCloseForm={callback.onCloseForm}
            />
            : <div className={cn('auth-none')}>
              <Link to={'/login'}>Войдите</Link>
              <span>, чтобы иметь возможность комментировать</span>
            </div>
          }
        </div>
      }

      {/*<CommentForm handleSubmit={callback.addComment} waiting={waiting}/>*/}

    </div>
  );
}

export default memo(Comments);