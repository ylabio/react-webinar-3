import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentLayout(props) {

  const cn = bem('CommentLayout')

  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии (6)</div>
      <div className={cn('content')}>
        {props.children}
      </div>
    </div>
  )
}

CommentLayout.PropTypes = {}

export default React.memo(CommentLayout);