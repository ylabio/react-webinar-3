import { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentItem from '../comment-item';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentForm from '../comment-form';
import PleaseLogin from '../please-login';
import { useParams } from 'react-router-dom';

function CommentsList({ t = () => {}, onSubmit = () => {}, comments, isExist, currentUser,commentsLength }) {
  const cn = bem('CommentsList');
  const [answerTo, setAnswerTo] = useState(null);
  const params = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    if (answerTo && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [answerTo]);

  const renderCommentNode = (comment, level = 0) => {
    const marginLeft = level <= 5 ? level * 40 : 5 * 40;

    return (
      <div key={comment._id}>
        <div style={{ marginLeft }}>
          <CommentItem
            level={level}
            clickToAnswer={() => setAnswerTo(comment._id)}
            isActive={answerTo === comment._id}
            userName={comment.author._id}
            date={comment.dateCreate}
            description={comment.text}
            onCloseForm={() => setAnswerTo(null)}
            isExist={isExist}
            t={t}
            onSubmit={e => onSubmit(e, comment._id, 'comment')}
            currentUser={currentUser === comment.author._id}
          />
        </div>

        {comment.children?.map(child => renderCommentNode(child, level + 1))}

        {answerTo === comment._id && (
          <div ref={answerTo === comment._id ? formRef : null} style={{ marginLeft: marginLeft + 40, marginTop: 24 }}>
            {isExist ? (
              <div>
                <CommentForm
                  action={e => onSubmit(e, comment._id, 'comment')}
                  onCancel={() => setAnswerTo(null)}
                  title={t('article.newreply')}
                  t={t}
                  cancel={true}
                  placeholder={`${t('article.placeholder')} ${comment.author._id}`}
                />
              </div>
            ) : (
              <PleaseLogin text={t('article.login_to_comment')} />
            )}
          </div>
        )}
      </div>
    );
  };

  const mainCommentContent = isExist ? (
    <div className={cn('form')}>
      <CommentForm action={e => onSubmit(e, params.id)} title={t('article.newcomment')} t={t} />
    </div>
  ) : (
    <PleaseLogin text={t('article.login_to_comment')} />
  );

  return (
    <div>
      <h2>
        {t('article.comments')} {`(${commentsLength || 0})`}
      </h2>
      <div className={cn()}>{comments?.map(comment => renderCommentNode(comment, 0))}</div>
      {!answerTo && mainCommentContent}
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      text: PropTypes.string,
      parent: PropTypes.object,
      dateCreate: PropTypes.string,
      author: PropTypes.object,
    }),
  ),
  isExist: PropTypes.bool,
  onSubmit: PropTypes.func,
  currentUser: PropTypes.string,
};

export default memo(CommentsList);
