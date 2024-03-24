import React, { Fragment, memo, useMemo, useState } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import ItemComments from "../../components/comments/item-comments";
import { useCallback } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import commentsActions from "../../store-redux/comments/actions";
import shallowEqual from "shallowequal";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
function ListComments() {
  const cn = bem("ListComments");

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const select = useSelector((state) => ({
    user: state.session.user,
  }));
  const [idVisibleForm, setIdVisibleForm] = useState(null);

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
    }, []),
    onCloseForm: useCallback(() => {
      dispatch(commentsActions.setTypeComments("article"));
      setIdVisibleForm(null);
    }, []),
    onOpenForm: useCallback((itemId) => {
      dispatch(commentsActions.setTypeComments("comment"));
      setIdVisibleForm(itemId);
    }, []),
  };
  const link = useMemo(
    () => (
      <Link to={"/login"} state={{ back: pathname }}>
        Войдите
      </Link>
    ),
    [pathname]
  );
  return (
    <div className={cn()}>
      {comments.map((item) => (
        <ItemComments
          key={item._id}
          item={item}
          textBtn={"Ответить"}
          action={callbacks.onOpenForm}
          isAuth={!!select.user.username}
          userId={select.user._id}
          disabledBtn={!!(item._id === idVisibleForm)}
          onCloseForm={callbacks.onCloseForm}
          onSubmit={callbacks.addComment}
          visibleForm={
            !!(idVisibleForm === item._id && selectRedux.type === "comment")
          }
          children={link}
        />
      ))}
    </div>
  );
}

export default memo(ListComments);
