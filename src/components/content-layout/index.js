import {memo} from 'react';
import PropTypes from "prop-types";

function ContentLayout({children}) {
  return (
      <>
        {children}
      </>
  );
}

ContentLayout.propTypes = {
  children: PropTypes.node
}

export default memo(ContentLayout);