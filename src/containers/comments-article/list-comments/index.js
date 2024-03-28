import React, { Fragment, memo, useMemo, useCallback, useRef } from "react";
import ItemComments from "../../../components/comments/item-comments";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { Link, useLocation, useNavigationType } from "react-router-dom";
import useSelector from "../../../hooks/use-selector";
import commentsActions from "../../../store-redux/comments/actions";
import shallowEqual from "shallowequal";
import treeToList from "../../../utils/tree-to-list";
import listToTree from "../../../utils/list-to-tree";
import useTranslate from "../../../hooks/use-translate";
import List from "../../../components/comments/list";
import Spinner from "../../../components/spinner";
import AnswerComment from "../../../components/comments/answer-comment";
import AutoScroll from "../../auto-scroll";
import setPaddingLeft from "../../../utils/setPaddingLeft";

function ListComments() {
  const { t, lang } = useTranslate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const typeNavigation = useNavigationType();
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
      idAfterRedirect: state.comments.idAfterRedirect,
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
      selectRedux.idAfterRedirect &&
        dispatch(commentsActions.setIdAfterRedirect(""));
    }, []),

    onOpenForm: useCallback((clickedId, showId, levelPadding) => {
      dispatch(commentsActions.setTypeComments("comment"));
      dispatch(commentsActions.setShowForm(clickedId, showId, levelPadding));
    }, []),
  };

  const link = useMemo(
    () => (
      <Link
        to={"/login"}
        onClick={() =>
          dispatch(
            commentsActions.setIdAfterRedirect(selectRedux.showForm.clickedId)
          )
        }
        state={{ back: pathname }}
      >
        {t("comment.textLink")}
      </Link>
    ),
    [pathname, selectRedux.showForm.clickedId, lang]
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
            paddingLeft={item.level && setPaddingLeft(item.level, 30)}
            idAfterRedirect={selectRedux.idAfterRedirect}
            typeNavigation={typeNavigation}
          />
          {!!(
            selectRedux.showForm.showId === item._id &&
            selectRedux.type === "comment"
          ) && (
            <AutoScroll>
              <AnswerComment
                id={selectRedux.showForm.clickedId}
                addComment={callbacks.addComment}
                t={t}
                onCloseForm={callbacks.onCloseForm}
                children={link}
                isAuth={!!select.user.username}
                paddingLeft={setPaddingLeft(
                  selectRedux.showForm.levelPadding + 1,
                  30
                )}
              />
            </AutoScroll>
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
