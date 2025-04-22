import { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Comment from '../comment';
import CommentForm from '../comment-form';
import CommentLogin from '../comment-login';
import CommentOffset from '../comment-offset';

function CommentsList({
  comments,
  parent,
  exists,
  onSubmit = () => {},
  setParent = () => {},
  location,
  resetParent,
  t,
  existsUserName,
  setCommentId = () => {},
}) {
  const cn = bem('CommentsList');
  const formRef = useRef(null);
  const maxNesting = 10;
  const [offsetForm, setOffsetForm] = useState(0);

  return (
    <>
      {comments.length > 0 && (
        <ul className={cn()}>
          {comments.map(comment => {
            return (
              <li key={comment._id}>
                <Comment
                  comment={comment}
                  id={comment._id}
                  dateCreate={comment.dateCreate}
                  name={comment.author.profile.name}
                  text={comment.text}
                  setParent={setParent}
                  t={t}
                  existsUserName={existsUserName}
                  offset={comment.offset}
                  maxNesting={maxNesting}
                  setOffsetForm={setOffsetForm}
                  setCommentId={setCommentId}
                />
                {parent._id === comment._id && (
                  <CommentOffset ref={formRef} offset={offsetForm} maxNesting={maxNesting}>
                    {exists && (
                      <CommentForm
                        cancel={true}
                        onSubmit={onSubmit}
                        onCancel={resetParent}
                        title={t('comment.newReply')}
                        placeholder={`${t('comment.placeholderReply')} ${comment.author.profile.name}`}
                        t={t}
                      />
                    )}
                    {!exists && (
                      <CommentLogin
                        isShowClose={true}
                        location={location}
                        onCancel={resetParent}
                        t={t}
                      />
                    )}
                  </CommentOffset>
                )}
              </li>
            );
          })}
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
