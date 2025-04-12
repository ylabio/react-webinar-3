import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function SectionHeader({title, padding = false}) {
  const cn = bem('SectionHeader');

  return <h2 className={cn({padding})}>{title}</h2>
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  padding: PropTypes.bool,
};

export default memo(SectionHeader);
