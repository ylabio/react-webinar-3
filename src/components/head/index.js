import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, headingLevel = 1, children }) {
  const cn = bem('Head');
  const HeadingTag = `h${headingLevel}`;

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <HeadingTag>{title}</HeadingTag>
        {children}
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node
};

export default React.memo(Head);
