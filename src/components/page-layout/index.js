import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({fullscreen, children}) {

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('center')} style={{
        minHeight: fullscreen ? '100vh' : 'auto',
        paddingBottom: fullscreen ? 0 : 90
      }}>
        {children}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
}

export default React.memo(PageLayout);
