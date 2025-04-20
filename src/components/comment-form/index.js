import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';
import PropTypes from 'prop-types';

function CommentForm(props) {
  const { 
    commentTitle, type, 
    setIsReplyActive = () => {},
    onSubmit = () => {},
    onChange = () => {} 
} = props;

  const cn = bem('CommentForm');

  return (
    <div className={cn()}>
      <form onSubmit={e => {
        e.preventDefault();
        onSubmit(e);
      }}>
        <p>{commentTitle}</p>
        <textarea name="newComment" required onChange={onChange} />
        <div className={cn('action')}>
          <Button style="primary" type="submit" title="Отправить" />

          {type === "reply" &&
            <Button style="outline" type="button" title="Отмена" onClick={() => setIsReplyActive(false)} />
          }
        </div>
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  commentTitle: PropTypes.string,
  type: PropTypes.string,
  setIsReplyActive: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};

export default memo(CommentForm);
