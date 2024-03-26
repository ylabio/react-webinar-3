import { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import formatDate from "../../utils/format-date";
import NewReply from "../new-reply";

function Comment({
  item,
  session,
  onOpenReply,
  onCloseReply,
  onSendReply,
  pathname,
  t,
}) {
  const [isNested, setIsNested] = useState(true);

  const nestedComments = (item.children || []).map((item) => {
    const ref = useRef();
    useEffect(() => {
      const left = window.scrollX + ref.current.getBoundingClientRect().left;
      const maxWidth =
        window.scrollX + document.querySelector(".PageLayout").offsetWidth;

      if (left >= maxWidth * 0.8) {
        setIsNested(false);
      }
    }, [item._id]);

    return (
      <div key={item._id} ref={ref} className={isNested ? "Comment-child" : ""}>
        <Comment
          item={item}
          onOpenReply={onOpenReply}
          onCloseReply={onCloseReply}
          onSendReply={onSendReply}
          session={session}
          pathname={pathname}
          t={t}
        />
      </div>
    );
  });

  const callbacks = {
    openReply: useCallback((e) => {
      // e.stopPropagation();
      onOpenReply(item._id);
    }),
    closeReply: useCallback((e) => {
      // e.stopPropagation();
      onCloseReply(item._id);
    }),
    sendReply: useCallback((text) => {
      onSendReply(item._id, text);
    }),
  };

  let author = false;
  if (session.exists) {
    author = item.author.profile.name === session.user.profile.name;
  }

  return (
    <>
      <div className="Comment">
        <div className="Comment-info">
          <div className={author ? "Comment-user_authorized" : "Comment-user"}>
            {item.author.profile.name}
          </div>
          <div className="Comment-date">
            {formatDate(item.dateCreate, t("comments.locale"))}
          </div>
        </div>
        <div className="Comment-text">{item.text}</div>
        <div className="Comment-reply" onClick={callbacks.openReply}>
          {t("comments.reply")}
        </div>

        {nestedComments}
      </div>
      {item.openReply && (
        <NewReply
          onClose={callbacks.closeReply}
          onSend={callbacks.sendReply}
          session={session.exists}
          pathname={pathname}
          t={t}
        />
      )}
    </>
  );
}

Comment.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  session: PropTypes.shape({ exists: PropTypes.bool }).isRequired,
  pathname: PropTypes.string,
  onOpenReply: PropTypes.func,
  onCloseReply: PropTypes.func,
  onSendReply: PropTypes.func,
  t: PropTypes.func,
};

Comment.defaultProps = {
  onAdd: () => {},
  onOpenReply: () => {},
  onCloseReply: () => {},
  onSendReply: () => {},
  t: (text) => text,
};
export default memo(Comment);
