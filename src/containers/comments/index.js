import {memo, useCallback, useEffect} from "react";
import Comment from "../../components/comment";
import shallowequal from 'shallowequal';
import {useDispatch, useSelector} from 'react-redux';
import useInit from '../../hooks/use-init';
import {useParams} from 'react-router-dom';
import commentsActions from '../../store-redux/comments/actions';
import commentsFormat from "../../utils/comments-format";
import CommentsLayout from "../../components/comments-layout";
import CommentField from "../comment-field";
import useTranslate from "../../hooks/use-translate";

function Comments() {

  const dispatch = useDispatch();
  const params = useParams();
  const {t} = useTranslate();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelector(state => ({
    comments: state.comments.data.items,
    currentComment: state.comments.currentId,
    count: state.comments.data.count,
  }), shallowequal);

  const callbacks = {
    onSet: useCallback((id) => dispatch(commentsActions.setCurrentId(id)), []),
  }

  const formattedComments = commentsFormat(select.comments);

  const indentSize = 30;

  return (
    <CommentsLayout title={t('comments')} count={select.count}>
      {formattedComments.map((comment) => {
        return <Comment key={comment._id}
          style={{ paddingLeft: (comment.indent * indentSize) + 'px' }}
          author={comment.author.profile.name}
          date={comment.dateCreate}
          text={comment.text}
          t={t}
          onClick={() => callbacks.onSet(comment._id)} >
          {comment._id === select.currentComment && <CommentField type={'comment'} id={comment._id}/>}
        </Comment>
      })}
      {!select.currentComment && <CommentField type={'article'} id={params.id}/>}
    </CommentsLayout>
  )
}

export default memo(Comments);
