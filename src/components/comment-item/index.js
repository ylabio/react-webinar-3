import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';
import CommentForm from '../comment-form';
import { Link } from 'react-router-dom';

function CommentItem(props) {
  const {
    LinkToLogin,
    treeLevel = 0,
    commentIdFormVisible = '',
    setCommentIdFormVisible = () => {},
    isLogin,
  } = props;
  const { author, dateCreate, text, children, _id,  } = props.comment;
  const cn = bem('CommentItem');
  const maxlevel = 5; //максимальный уровень вложенности
  if (!props.comment) return null;

  return (
    <>
      <div className={cn()} style={{ marginLeft: `${40 * Math.min(maxlevel, treeLevel)}px` }}>
        <div className={cn('header')}>
          <span className={cn('author')}>{author.profile.name}</span>
          <span className={cn('date')}>{new Date(dateCreate).toLocaleString()}</span>
        </div>
        <div className={cn('content')}>{text}</div>
        <span onClick={() => setCommentIdFormVisible(_id)} className={cn('mention')}>
          Ответить
        </span>
        {commentIdFormVisible === _id &&
          (isLogin ? (
            <CommentForm
              _id={_id}
              _type={`comment`}
              secondButtonTitle={`Отмена`}
              setCommentIdFormVisible={setCommentIdFormVisible}
              title={`Новый ответ`}
            />
          ) : (
            <LinkToLogin/>
          ))}
      </div>
      {children.length > 0 &&
        children.map(children => (
          <CommentItem
            isLogin={isLogin}
            key={children._id}
            setCommentIdFormVisible={setCommentIdFormVisible}
            commentIdFormVisible={commentIdFormVisible}
            comment={children}
            treeLevel={treeLevel + 1}
            LinkToLogin={LinkToLogin}
          />
        ))}
    </>
  );
}

CommentItem.propTypes = {
  author: PropTypes.string,
  dateCreate: PropTypes.string,
  parent: PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.string,
  }),
  text: PropTypes.string,
  _id: PropTypes.string,
};

export default memo(CommentItem);
