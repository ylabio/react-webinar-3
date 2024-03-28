import { memo, useCallback, useMemo } from "react";
import { cn as bem } from "@bem-react/classname";
import CommentForm from "../../components/comment-form";
import { useDispatch, useSelector } from "react-redux";
import { default as oldSelector } from "../../hooks/use-selector";
import { useLocation, useParams } from "react-router-dom";
import shallowequal from "shallowequal";
import CommentsItem from "../../components/comments-item";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import articleCommentsActions from "../../store-redux/article-comments/actions";
import CommentsList from "../../components/comments-list";

function CommentsWidget() {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const select = useSelector(
    (state) => ({
      formId: state.articleComments.formId,
      comments: state.articleComments.data,
      count: state.articleComments.count,
      waitingComments: state.articleComments.waiting,
    }),
    shallowequal
  );

  const session = oldSelector((state) => ({
    username: state.session.user.profile?.name,
    exists: state.session.exists,
    token: state.session.token,
  }));

  const callbacks = {
    // Запоминаем id элемента с открытой формой комментария
    setFormId: useCallback(
      (_id) => {
        dispatch(articleCommentsActions.setFormId(_id));
      },
      [dispatch]
    ),
    // Отмена ввод комментария
    onCloseForm: useCallback(() => {
      dispatch(articleCommentsActions.setFormId(""));
    }, [dispatch]),

    // Отправка сообщения
    onCommentSend: useCallback(
      (_id, _type, text) => {
        dispatch(
          articleCommentsActions.send(
            session.username,
            session.token,
            _id,
            _type,
            text
          )
        );
      },
      [dispatch, session.token, session.username, params.id]
    ),
  };

  // Форматируем загруженные комментарии под нужный формат
  const comments = useMemo(
    () => [
      ...treeToList(listToTree(select.comments), (item, level) => ({
        _id: item._id,
        offset: level,
        // children: item.children.length,
        // formId:
        //   item.children.length !== 0 ? item.children[length - 1] : item._id,
        username: item.author?.profile.name,
        date: item.dateCreate,
        text: item.text,
      })).slice(1),
    ],
    [select.comments]
  );

  console.log(comments);
  // Рендер-функция компонента комментария
  const renders = {
    commentsItem: useCallback(
      (comment) => (
        <CommentsItem
          comment={comment}
          username={session.username}
          setFormId={callbacks.setFormId}
        />
      ),
      [callbacks.setFormId, session.username]
    ),
  };

  return (
    // Пропсы! Тысячи их!
    <>
      <CommentsList
        comments={comments}
        renderItem={renders.commentsItem}
        formId={select.formId}
        sessionExists={session.exists}
        pathname={location.pathname}
        onCloseForm={callbacks.onCloseForm}
        onCommentSend={callbacks.onCommentSend}
      />
      {select.formId === "" && (
        <CommentForm
          type="article"
          sessionExists={session.exists}
          formId={params.id}
          onCommentSend={callbacks.onCommentSend}
          pathname={location.pathname}
        />
      )}
    </>
  );
}

export default memo(CommentsWidget);
