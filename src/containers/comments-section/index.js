import {memo, useCallback, useRef, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import {useDispatch, useSelector as useSelectorRedux} from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../components/spinner";
import shallowequal from "shallowequal";
import Comment from "../../components/comment";
import CommentsAmount from "../../components/comments-amount";
import EnterRequirement from "../../components/enter-requirement";
import CommentWriter from "../../components/comment-writer";
import useSelector from "../../hooks/use-selector";
import commentsActions from "../../store-redux/comments/actions";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import {useLocation, useNavigate} from "react-router-dom";
import findChildId from "../../utils/find-child-id";

function CommentsSection({articleId}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const answerRef = useRef(null);

  const selectRedux = useSelectorRedux(
    state => ({
      comments: state.comments.data,
      waiting: state.comments.waiting,
      chosenComment: state.comments.chosenComment,
    }), shallowequal);

  const select = useSelector(state => ({
    exists: state.session.exists,
    userId: state.session.user._id,
  }));

  const options = {
    //Сортируем массив комментариев в соответствии с иерархией
    commentsList: treeToList(listToTree(selectRedux.comments, item => item.parent._type === "comment"),
      (comment, level) => ({...comment, level})),
    //Находим выбранный комментарий, определяем его как родительский и проверяем на наличие дочерних комментариев
    commentId: findChildId(listToTree(selectRedux.comments, item => item.parent._id === selectRedux.chosenComment),
      selectRedux.chosenComment),
  };

  const callbacks = {
    // Выбор комментария для ответа
    choseComment: useCallback(id => {
      dispatch(commentsActions.choseComment(id));
      if (id !== null) setTimeout(() => answerRef.current.scrollIntoView({block: "center"}), 1);
    }, []),
    // Отправка комментария на сервер
    sendComment: useCallback(comment => {
        const commentToSend = {
          text: comment,
          parent: {
            _id: selectRedux.chosenComment || articleId,
            _type: selectRedux.chosenComment ? "comment" : "article",
          }};
        dispatch(commentsActions.sendComment(commentToSend));
      }, [selectRedux.chosenComment]),
    onNavigate: useCallback(() => navigate("/login", {state: {back: location.pathname}}), [location.pathname]),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsAmount amount={selectRedux.comments.length} />
      {options.commentsList.map(comment => (
        <Comment
          key={comment._id}
          commentData={comment}
          exists={select.exists}
          articleId={articleId}
          chosenComment={options.commentId}
          onChoseComment={callbacks.choseComment}
          onSendComment={callbacks.sendComment}
          userId={select.userId}
          onNavigate={callbacks.onNavigate}
          answerRef={answerRef}
          hasChild={selectRedux.chosenComment !== options.commentId}
        />
      ))}
      <EnterRequirement
        visible={!select.exists && !selectRedux.chosenComment}
        onNavigate={callbacks.onNavigate}
        answerRef={answerRef}
      />
      <CommentWriter
        visible={select.exists && !selectRedux.chosenComment}
        articleId={articleId}
        onSendComment={callbacks.sendComment}
        answerRef={answerRef}
      />
    </Spinner>
  );
}

CommentsSection.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default memo(CommentsSection);