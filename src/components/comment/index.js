import { memo } from 'react';
import Button from '../button';
import NewComment from '../new-comment';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Comment({children}) {
  const cn = bem('Comment');

  return (
    <div className={cn()}>
      <article>
        <div className={cn('row')}>
          <h3>User №1</h3>
          <time datetime="">25 августа 2022 в 14:00</time>
        </div>
        <p>
          Текст комментрия о том какой товар. Комментатор может оставить большой комментрий и он весь показывается. Текст комментрия о том какой товар.
        </p>
        <Button style="text" type="button" title="Ответить" />
      </article>
      <div className={cn('children')}>
        {children}
        <NewComment/>
      </div>
    </div>
  );
}

Comment.propTypes = {
  children: PropTypes.node,
};

export default memo(Comment);
