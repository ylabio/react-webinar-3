import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import CommentItem from '../comment-item';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentForm from '../comment-form';
import PleaseLogin from '../please-login';
import { useParams } from 'react-router-dom';
function CommentsList({ t = () => {}, onSubmit = () => {}, comments, isExist }) {
  const cn = bem('CommentsList');
  const [answerTo, setAnswerTo] = useState(null);
  const handleCloseForm = () => {
    setAnswerTo(null);
  };
  const params = useParams();
  let commentContent = isExist ? (
    <CommentForm action={(e, id) => onSubmit(e, params.id)} title={t('article.newcomment')} t={t} />
  ) : (
    <PleaseLogin text={'чтобы иметь возможность комментировать'} />
  );
  return (
    <>
      <div className="Comments">
        <h2>
          {t('article.comments')} {`(${comments ? comments.length : 0})`}{' '}
        </h2>
        <ul className={cn()}>
          {comments &&
            comments.map(comment => (
              <li className={cn('item')} key={comment.value}>
                <CommentItem
                  level={comment.level}
                  clickToAnswer={() =>
                    setAnswerTo(prev => (prev === comment.value ? null : comment.value))
                  }
                  isActive={answerTo === comment.value}
                  userName={comment.author}
                  date={comment.date}
                  description={comment.text}
                  onCloseForm={handleCloseForm}
                  isExist={isExist}
                  t={t}
                  onSubmit={(e, id, type) => onSubmit(e, comment.value, comment.parent)}
                />
              </li>
            ))}
        </ul>
      </div>
      {answerTo === null ? commentContent : null}
    </>
  );
}
CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      level: PropTypes.number,
      text: PropTypes.string,
      date: PropTypes.string,
      author: PropTypes.string,
      parent: PropTypes.string,
    }),
  ),
  isExist: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default memo(CommentsList);
