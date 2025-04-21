import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatDate } from '../../utils/formatDate';
import PropTypes from 'prop-types';
function CommentItem({
  t = () => {},
  userName,
  isActive,
  date,
  description,
  clickToAnswer = () => {},
  currentUser,
}) {
  const cn = bem('Comment');
  const formatedDate = formatDate(date, t('monthNames'), t('at'));
  return (
    <>
      <div className={cn()}>
        <div className={currentUser ? cn('info-current') : cn('info')}>
          <p>
            {userName} <span className={cn('date')}>{formatedDate}</span>
          </p>
        </div>
        <div className={cn('text')}>{description}</div>
        <div>
          {!isActive && (
            <div className={cn('actions')}>
              <button onClick={clickToAnswer}>{t('article.reply')}</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
CommentItem.propTypes = {
  userName: PropTypes.string,
  description: PropTypes.string,
  isActive: PropTypes.bool,
  clickToAnswer: PropTypes.func,
  onCloseForm: PropTypes.func,
  t: PropTypes.func,
};
export default memo(CommentItem);
