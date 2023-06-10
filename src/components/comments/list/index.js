import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

/**
 * Лист комментов.
 */

function CommentList({ list, comment, editor, t }) {
  const cn = bem('CommentList');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('comments.title')} ({list?.length - 1})</div>
      {list?.length ? list.map(item => item._type == 'editor' ? editor(item) : comment(item)) : null}
    </div>
  );
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  comment: PropTypes.func,
  editor: PropTypes.func,
  t: PropTypes.func
}

CommentList.defaultProps = {
  list: [],
  comment: (item) => { return item.toString(); },
  editor: (item) => { return item.toString(); },
  t: () => { }
}

export default React.memo(CommentList);