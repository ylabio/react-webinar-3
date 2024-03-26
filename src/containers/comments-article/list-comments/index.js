import React, { Fragment, memo, useMemo } from "react";
import ItemComments from "../../../components/comments/item-comments";
import { useCallback } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useSelector from "../../../hooks/use-selector";
import commentsActions from "../../../store-redux/comments/actions";
import shallowEqual from "shallowequal";
import treeToList from "../../../utils/tree-to-list";
import listToTree from "../../../utils/list-to-tree";
import useTranslate from "../../../hooks/use-translate";
import List from "../../../components/comments/list";
import Spinner from "../../../components/spinner";
import AnswerComment from "../../../components/comments/answer-comment";

function ListComments() {
  const { t, lang } = useTranslate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const select = useSelector((state) => ({
    user: state.session.user,
  }));

  const selectRedux = useSelectorRedux(
    (state) => ({
      comments: state.comments.data,
      waiting: state.comments.waiting,
      waitingAdd: state.comments.waitingAdd,
      type: state.comments.typeComments,
      showForm: state.comments.showFormController,
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
      callbacks.onCloseForm();
    }, []),

    onCloseForm: useCallback(() => {
      dispatch(commentsActions.setTypeComments("article"));
      dispatch(commentsActions.setShowForm(null, null, 0));
    }, []),

    onOpenForm: useCallback((clickedId, showId, levelPadding) => {
      dispatch(commentsActions.setTypeComments("comment"));
      dispatch(commentsActions.setShowForm(clickedId, showId, levelPadding));
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

  const renders = {
    item: useCallback(
      (item) => (
        <Fragment key={item._id}>
          <ItemComments
            lang={lang}
            item={item}
            textBtn={t("comment.answer")}
            action={callbacks.onOpenForm}
            userId={select.user._id}
          />
          {!!(
            selectRedux.showForm.showId === item._id &&
            selectRedux.type === "comment"
          ) && (
            <AnswerComment
              id={selectRedux.showForm.clickedId}
              addComment={callbacks.addComment}
              t={t}
              onCloseForm={callbacks.onCloseForm}
              children={link}
              isAuth={!!select.user.username}
              paddingLeft={(selectRedux.showForm.levelPadding + 1) * 30}
            />
          )}
        </Fragment>
      ),
      [callbacks]
    ),
  };
  return (
    <Spinner active={selectRedux.waiting || selectRedux.waitingAdd}>
      <List list={comments} renderItem={renders.item} />
    </Spinner>
  );
}

export default memo(ListComments);
