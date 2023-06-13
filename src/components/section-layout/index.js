import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function SectionLayout({ title, children, padding }) {
  const cn = bem('SectionLayout');
  return (
    <section className={cn({ padding })}>
      <h3 className={cn('title')}>{title}</h3>
      {children}
    </section>
  );
}

SectionLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  padding: PropTypes.oneOf(['small', 'medium', 'large']),
};

SectionLayout.defaultProps = {};

export default memo(SectionLayout);
