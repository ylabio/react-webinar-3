import useStore from "../../hooks/use-store";
import List from "../list";
import {memo, useCallback} from "react";
import Comment from "../comment";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CommentForm from "../comment-form";

function Comments({comments, count, itemId}) {
  const store = useStore();

  const cn = bem('Comments');
  console.log(comments)

  const renders = {
    item: useCallback(item => (
      <Comment item={item} />
    ), []),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии ({count})</div>

      {comments && comments.length !== 0
        ? <div className={cn('list')}>
          {comments.map((item) => (<Comment item={item} /> ))}
        </div>
        : <div>Нет комментариев</div>
      }

      <CommentForm />

    </div>
  );
}

export default memo(Comments);