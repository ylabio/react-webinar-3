import { memo } from 'react';
import PropTypes from 'prop-types';
import CommentForm from '../comment-form';
import CommentItem from '../comment-item';

function CommentContainer(props) {
  const {
    LinkToLogin,
    treeLevel = 0,
    commentIdFormVisible = '',
    setCommentIdFormVisible = () => {},
    isLogin = false,
    lastChild = false,
    userId = '',
  } = props;

  if (!props.comment) return null;

  const { author, dateCreate, text, children, _id, parent } = props.comment;
  const hasChildren = children.length > 0;
  const maxlevel = 5; //максимальный уровень вложенности

  const commentOffset = 40 * Math.min(maxlevel, treeLevel);
  const formOffset = commentOffset + (!hasChildren && commentIdFormVisible === _id ? 40 : 0);
  const date = new Date(dateCreate).toLocaleString();
  const isUserComment = userId === author._id;
  const isShowForm =
    (commentIdFormVisible === parent._id && lastChild) ||
    (!hasChildren && commentIdFormVisible === _id);

  return (
    <>
      <CommentItem
        setCommentIdFormVisible={setCommentIdFormVisible}
        text={text}
        date={date}
        authorName={author.profile.name}
        isUserComment={isUserComment}
        commentOffset={commentOffset}
        _id={_id}
      />
      <div style={{ marginLeft: `${formOffset}px` }}>
        {isShowForm &&
          (isLogin ? (
            <CommentForm
              _id={commentIdFormVisible}
              _type={`comment`}
              secondButtonTitle={`Отмена`}
              setCommentIdFormVisible={setCommentIdFormVisible}
              title={`Новый ответ`}
            />
          ) : (
            <LinkToLogin />
          ))}
      </div>
      {hasChildren &&
        children.map((child, index) => {
          return (
            <CommentContainer
              isLogin={isLogin}
              key={child._id}
              setCommentIdFormVisible={setCommentIdFormVisible}
              commentIdFormVisible={commentIdFormVisible}
              comment={child}
              treeLevel={treeLevel + 1}
              LinkToLogin={LinkToLogin}
              lastChild={!!(index === children.length - 1)}
              userId={userId}
            />
          );
        })}
    </>
  );
}

CommentContainer.propTypes = {
  author: PropTypes.string,
  dateCreate: PropTypes.string,
  parent: PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.string,
  }),
  text: PropTypes.string,
  _id: PropTypes.string,
};

export default memo(CommentContainer);
