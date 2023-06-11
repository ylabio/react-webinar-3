import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css';
import useTranslate from "../../hooks/use-translate";

/**
 * Лист комментов.
 */

function CommentList({ list, comment, editor }) {
  const cn = bem('CommentList');
  const {t} = useTranslate();
  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('comment.title')} ({list?.length - 1})</div>
      {list?.length ? list.map(item => item._type == 'editor' ? editor(item) : comment(item)) : null}
    </div>
  );
}

export default React.memo(CommentList);