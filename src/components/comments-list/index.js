import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Comment from '../comment';
import CommentForm from '../comment-form';
import CommentLogin from '../comment-login';

function CommentsList({
  comments,
  parent,
  exists,
  onSubmit = () => {},
  setParent = () => {},
  location,
  resetParent,
}) {
  const cn = bem('CommentsList');
  return (
    <>
      {comments.length > 0 && (
        <ul className={cn()}>
          {comments.map(comment => (
            <li key={comment._id} style={{ paddingLeft: `${comment.offset * 40}px` }}>
              <Comment
                id={comment._id}
                dateCreate={comment.dateCreate}
                name={comment.author.profile.name}
                text={comment.text}
                setParent={setParent}
              />
              {parent._id === comment._id && exists && (
                <CommentForm
                  cancel={true}
                  onSubmit={onSubmit}
                  onCancel={resetParent}
                  id={comment._id}
                  title={'Ответ'}
                  placeholder={`Мой ответ для ${comment.author.profile.name}`}
                />
              )}
              {parent._id === comment._id && !exists && (
                <CommentLogin isShowClose={true} location={location} onCancel={resetParent} />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dateCreate: PropTypes.string,
      text: PropTypes.string,
      author: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        profile: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
      offset: PropTypes.number,
    }),
  ),
  parent: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _type: PropTypes.string,
  }),
  exists: PropTypes.bool,
  onSubmit: PropTypes.func,
  setParent: PropTypes.func,
  location: PropTypes.object,
  resetParent: PropTypes.func,
};

export default memo(CommentsList);
