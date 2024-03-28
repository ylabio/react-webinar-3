import { cn as bem } from "@bem-react/classname";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import shallowEqual from "shallowequal";
import AuthAlert from "../../components/auth-alert";
import Comment from "../../components/comment";
import CommentForm from "../../components/comment-form";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import commentsActions from "../../store-redux/comments/actions";
import dateFormat from "../../utils/date-format";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import "./style.css";

function Comments() {
  const [activeReplyId, setActiveReplyId] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isValidSession, userId } = useSelector((state) => ({
    isValidSession: state.session.exists,
    userId: state.session.user._id,
  }));
  const select = useSelectorRedux(
    (state) => ({
      comments: state.comments.data.items,
      amount: state.comments.data.count,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const callbacks = {
    onReply: useCallback((id) => setActiveReplyId(id), [setActiveReplyId]),
    onSubmit: (e) => {
      e.preventDefault();
      if (!/\S/.test(e.target.text.value)) return;
      dispatch(
        commentsActions.post({
          text: e.target.text.value,
          parent: {
            _id: activeReplyId ? activeReplyId : select.article._id,
            _type: activeReplyId ? "comment" : "article",
          },
        })
      );
      setActiveReplyId(null);
    },
    onCancel: useCallback(() => {
      setActiveReplyId(null);
    }, [setActiveReplyId]),
    onLogin: () => {
      navigate("/login", { state: { back: location.pathname } });
    },
  };

  const options = {
    comments: useMemo(() => {
      console.log(listToTree(select.comments));
      return treeToList(listToTree(select.comments), (item, level) => ({
        _id: item._id,
        text: item.isDeleted ? "Комментарий удален" : item.text,
        date: dateFormat(item.date),
        author: item?.author?.profile?.name,
        isAuthor: item?.author?._id === userId,
        level: level - 1,
        parent:
          !item.parent || item.parent._type == "article" ? {} : item.parent,
      })).slice(1);
    }, [select.comments]),
  };

  const cn = bem("Comments");
  return (
    <Spinner active={select.waiting}>
      <div className={cn()}>
        <h3 className={cn("title")}>Комментарии ({select.amount})</h3>
        <div className={cn("list")}>
          {options.comments.map((c) => (
            <div
              key={c._id}
              // style={{ marginLeft: c.level <= 5 ? c.level * 20 : 5 * 20 }}
            >
              <Comment comment={c} onReply={callbacks.onReply} />
              {isValidSession && activeReplyId === c._id && (
                <div
                  style={{
                    marginLeft: c.level <= 5 ? (c.level + 1) * 30 : 6 * 30,
                  }}
                >
                  <CommentForm
                    isReply
                    onSubmit={callbacks.onSubmit}
                    onCancel={callbacks.onCancel}
                  />
                </div>
              )}
              {!isValidSession && activeReplyId === c._id && (
                <AuthAlert
                  onLogin={callbacks.onLogin}
                  onCancel={callbacks.onCancel}
                  isReply
                />
              )}
            </div>
          ))}
        </div>
        {isValidSession && !activeReplyId && (
          <CommentForm onSubmit={callbacks.onSubmit} />
        )}
        {!isValidSession && !activeReplyId && (
          <AuthAlert isReply={false} onLogin={callbacks.onLogin} />
        )}
      </div>
    </Spinner>
  );
}

export default memo(Comments);
