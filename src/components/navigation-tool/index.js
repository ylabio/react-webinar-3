import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function NavigationTool({children}) {
  const cn = bem('NavigationTool');

  return (
    <div className={cn()}>
      {
        children.map((item, i) => {
          return <div key={i}>{item}</div>
        })
      }
    </div>
  )
}

NavigationTool.propTypes = {
  children: PropTypes.node
};

export default memo(NavigationTool);