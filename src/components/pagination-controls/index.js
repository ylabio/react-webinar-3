import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaginationControls({ children }) {
  const cn = bem('PaginationControls');

  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

PaginationControls.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(PaginationControls); 