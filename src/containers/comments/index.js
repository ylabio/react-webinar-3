import { memo, useCallback } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import shallowequal from "shallowequal";
import { useNavigate, useParams } from "react-router-dom";
import useInit from "../../hooks/use-init";
import commentsActions from "../../store-redux/comments/actions";
import CommentsContainer from '../../components/comments-container';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import useSelector from "../../hooks/use-selector";
import Spinner from '../../components/spinner';

function Comments() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
    dispatch(commentsActions.setAnswer(params.id, 'article'));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      comments: state.comments.comments,
      answerId: state.comments.answer.id,
      answerType: state.comments.answer.type,
      waiting: state.comments.waiting
    }),
    shallowequal
  );

  const session = useSelector(state => ({
    exists: state.session.exists,
    userId: state.session.user._id
  }));

  const callbacks = {
    cancelAnswer: useCallback(() => {
      dispatch(commentsActions.setAnswer(params.id, 'article'))
    }, [params.id]),
    setAnswer: useCallback((id) => {
      dispatch(commentsActions.setAnswer(id, 'comment'))
    }, []),
    sendComment: useCallback((text) => {
      dispatch(commentsActions.sendComment(text, select.answerId, select.answerType))
    }, [select.answerId, select.answerType])
  }

  return (
    <Spinner active={select.waiting}>
      <CommentsContainer
        count={select.comments.count}
        comments={listToTree(Object.values(select.comments.items), '_id', 'article')}
        userId={session.userId}
        exist={session.exists}
        showAnswerForm={params.id === select.answerId}
        answerId={select.answerId}
        onCancel={callbacks.cancelAnswer}
        onAnswer={callbacks.setAnswer}
        onSend={callbacks.sendComment}
      />
    </Spinner>
  );
}

export default memo(Comments);
