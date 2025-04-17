import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatDate } from '../../utils/formatDate';
import PropTypes from 'prop-types';
import CommentForm from '../comment-form';
import PleaseLogin from '../please-login';
function CommentItem({
  onSubmit = () => {},
  t = () => {},
  isExist,
  userName,
  isActive,
  date,
  description,
  level,
  clickToAnswer = () => {},
  onCloseForm = () => {},
}) {
  let commentContent = isExist ? (
    <CommentForm
      t={t}
      action={onSubmit}
      onCancel={onCloseForm}
      cancel={true}
      title={t('article.newreply')}
      placeholder={`${t('article.placeholder')} ${userName}`}
    />
  ) : (
    <PleaseLogin text={'чтобы иметь возможность комментировать'} />
  );
  const cn = bem('Comment');
  const formatedDate = formatDate(date);
  return (
    <>
      <div className={cn()} style={{ marginLeft: 1 * level }}>
        <div className={cn('info')}>
          <p>
            {userName} <span className={cn('date')}>{formatedDate}</span>
          </p>
        </div>
        <div className={cn('text')}>{description}</div>
        <div>
          {!isActive ? (
            <div className={cn('actions')}>
              {' '}
              <button onClick={clickToAnswer}>{t('article.reply')}</button>
            </div>
          ) : (
            <div className={cn('form')}>{commentContent}</div>
          )}
        </div>
      </div>
    </>
  );
}
CommentItem.propTypes = {
  userName: PropTypes.string,
  description: PropTypes.string,
  level: PropTypes.number,
  isExist: PropTypes.bool,
  isActive: PropTypes.bool,
  onSubmit: PropTypes.func,
  clickToAnswer: PropTypes.func,
  onCloseForm: PropTypes.func,
  t: PropTypes.func,
};
export default memo(CommentItem);
