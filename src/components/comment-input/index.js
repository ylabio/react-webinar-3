import { memo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css'

function CommentInput({title, onInput, children, type}) {

  const cn = bem('CommentField');

  return (
    <div className={cn()}>
      <div className={cn(type)}>
        <div className={cn('title')}>{title}</div>
        <div className={cn('input')}>
          <textarea onChange={(e) => onInput(e.target.value)}></textarea>
        </div>
        <div className={cn('buttons')}>
          {children}
        </div>
      </div>
    </div>
  )
}

CommentInput.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
  onInput: PropTypes.func,
};

CommentInput.defaultProps = {
  onInput: () => {
  }
}

export default memo(CommentInput);
