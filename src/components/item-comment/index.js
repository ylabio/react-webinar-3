import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';

function ItemComment({ author, date, text, titleBtn, onClick = () => {} }) {
  const cn = bem('ItemComment');
  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <strong>{author}</strong> <span>{date}</span>
      </div>
      <p className={cn('text')}>{text}</p>
      <Button type={'button'} title={titleBtn} style={'text-primary'} onClick={onClick} />
    </div>
  );
}

ItemComment.propTypes = {
  date: PropTypes.string,
  author: PropTypes.string,
  text: PropTypes.string,
  titleBtn: PropTypes.string,
  onClick: PropTypes.func,
};

export default memo(ItemComment);
