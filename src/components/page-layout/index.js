import React, { useCallback } from 'react';
import { cn as bem } from '@bem-react/classname'
import './style.css'
import * as PropTypes from "prop-types";

const pageLayoutClass = bem( "PageLayout" );

const PageLayout = React.memo( ( { children } ) => {

  return (
    <div className={ pageLayoutClass() }>
      { children }
    </div>
  );

} );
PageLayout.propTypes = {
  children: PropTypes.node,
};

export { PageLayout, pageLayoutClass };

