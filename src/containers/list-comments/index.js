import React, { memo, useMemo, useState } from "react";
import ItemComments from "../../components/comments/item-comments";
import { useCallback } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import commentsActions from "../../store-redux/comments/actions";
import shallowEqual from "shallowequal";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import useTranslate from "../../hooks/use-translate";
import List from "../../components/comments/list";
function ListComments() {
  const { t, lang } = useTranslate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const select = useSelector((state) => ({
    user: state.session.user,
  }));
  const [idVisibleForm, setIdVisibleForm] = useState(null);
  const [idComment, setIdComment] = useState(null);
  const [level, setLevel] = useState(0);

  const selectRedux = useSelectorRedux(
    (state) => ({
      count: state.comments.count,
      comments: state.comments.data,
      waiting: state.comments.waiting,
      type: state.comments.typeComments,
    }),
    shallowEqual
  );

  let comments = useMemo(() => {
    return selectRedux.comments.length
      ? [
          ...treeToList(
            listToTree(selectRedux.comments)[0].children,
            (item, level) => ({
              ...item,
              level: level,
            })
          ),
        ]
      : [];
  }, [selectRedux.comments]);
  console.log(comments);
  const callbacks = {
    addComment: useCallback((text, commentId) => {
      dispatch(
        commentsActions.add({
          text: text,
          parent: {
            _id: commentId,
            _type: "comment",
          },
        })
      );
      dispatch(commentsActions.setTypeComments("article"));
      setIdVisibleForm(null);
      setIdComment(null);
      setLevel(0);
    }, []),
    onCloseForm: useCallback(() => {
      dispatch(commentsActions.setTypeComments("article"));
      setIdVisibleForm(null);
      setIdComment(null);
      setLevel(0);
    }, []),
    onOpenForm: useCallback((itemId, idComment, level) => {
      dispatch(commentsActions.setTypeComments("comment"));
      console.log(itemId, idComment, level, "click");
      setIdVisibleForm(itemId);
      setIdComment(idComment);
      setLevel(level);
    }, []),
  };
  const link = useMemo(
    () => (
      <Link to={"/login"} state={{ back: pathname }}>
        {t("comment.textLink")}
      </Link>
    ),
    [pathname]
  );
  return (
    <List>
      {comments.map((item) => (
        <ItemComments
          lang={lang}
          t={t}
          key={item._id}
          idComment={idComment}
          item={item}
          level={level}
          textBtn={t("comment.answer")}
          action={callbacks.onOpenForm}
          isAuth={!!select.user.username}
          userId={select.user._id}
          disabledBtn={!!(item._id === idComment)}
          onCloseForm={callbacks.onCloseForm}
          onSubmit={callbacks.addComment}
          visibleForm={
            !!(idVisibleForm === item._id && selectRedux.type === "comment")
          }
          type={selectRedux.type}
          children={link}
        />
      ))}
    </List>
  );
}

export default memo(ListComments);
