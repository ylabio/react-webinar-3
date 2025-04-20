import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function CommentForm(props) {
  const { commentTitle, type, onSubmit,
   setIsReplyActive, onChange } = props;

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

// CommentForm.propTypes = {
//   article: PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     description: PropTypes.string,
//     madeIn: PropTypes.object,
//     category: PropTypes.object,
//     edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     price: PropTypes.number,
//   }).isRequired,
//   onAdd: PropTypes.func,
//   t: PropTypes.func,
// };

export default memo(CommentForm);
