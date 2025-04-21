import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../button';
import Form from '../form';
import './style.css';

const CommentForm = ({
  onSubmit,
  onReset,
  articleId,
  parentCommentId = null,
  isAuth,
  depth = 0,
  t,
}) => {
  const cn = bem('CommentForm');

  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current && parentCommentId) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [parentCommentId]);

  const handleSubmit = e => {
    e.preventDefault();
    const trimmedText = text.trim();

    if (trimmedText === '') {
      setError(t('comments.empty-comment'));
      return;
    }

    setError('');

    const commentData = {
      text,
      parent: {
        _id: parentCommentId || articleId,
        _type: parentCommentId ? 'comment' : 'article',
      },
    };

    onSubmit(commentData);
    setText('');
  };

  const handleTextChange = e => {
    setText(e.target.value);
  };

  return (
    <div className={cn()} style={{ paddingLeft: 40 * depth }} ref={formRef}>
      {isAuth ? (
        <Form
          onSubmit={handleSubmit}
          title={parentCommentId ? t('comments.new-reply') : t('comments.new-comment')}
          submitTitle={t('comments.send')}
          resetTitle={t('comments.cancel')}
          resetButton={!!parentCommentId}
          onReset={onReset}
          margin="medium"
          titleSize="medium"
        >
          <textarea name="comment" value={text} onChange={handleTextChange} required />
          {error && <div className={cn('error')}>{error}</div>}
        </Form>
      ) : (
        <div className={cn('hint')}>
          <Button
            style="text-primary"
            title={t('comments.sign-in')}
            onClick={() => navigate('/login', { state: { back: location.pathname } })}
          />
          , {t('comments.sign-in-hint')}
        </div>
      )}
    </div>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  articleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  parentCommentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isAuth: PropTypes.bool.isRequired,
};

export default memo(CommentForm);
