import {memo, useCallback, useMemo, useState} from "react";
import CommentsList from "../comments-list";
import {useSelector as useSelectorRedux} from "react-redux/es/hooks/useSelector";
import shallowequal from "shallowequal";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import commentsActions from "../../store-redux/comments/actions";
import {useDispatch} from "react-redux";

export const MAX_LEVEL = 6
export const PADDING_SIZE = 30

function Comments() {
  const dispatch = useDispatch();

  const [commentForm, setCommentForm] = useState({
    isAnswer: false,
    answerObj: null
  });

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    articleId: state.article.data._id
  }), shallowequal);

  const options = {
    updatedComments: useMemo(() => {
      const comments = commentForm.answerObj ? [...select.comments, commentForm.answerObj] : select.comments

      const commentsList = treeToList(listToTree(comments, select.articleId), (item, level) => (
        {...item, level}))

      return commentsList
    }, [select.comments, commentForm]),
  };

  const callbacks = {
    onSend: useCallback((id, text, type) => {
      dispatch(commentsActions.send(id, text, type));
    }, []),

    onAnswer: useCallback((answerId) => {
      setCommentForm({
        isAnswer: true,
        answerObj: {
          type: 'form',
          parent: {
            _id: answerId,
            _type: 'comment'
          }
        }
      })
    }, []),

    onCancel: useCallback(() => {
      setCommentForm({
        isAnswer: false,
        answerObj: null
      })
    }, []),
  }

  return (
    <CommentsList articleId={select.articleId}
                  comments={options.updatedComments}
                  commentForm={commentForm}
                  onSend={callbacks.onSend}
                  onAnswer={callbacks.onAnswer}
                  onCancel={callbacks.onCancel}
    />
  );
}

export default memo(Comments);
