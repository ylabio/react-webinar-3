import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthBar from '../auth-bar';
import Breadcrumbs from '../breadcrumbs';
import './style.css';

function Head({ title, breadcrumbs, browserTitle='Магазин', children }) {
  useEffect(() => {
      document.title = browserTitle;
  }, [browserTitle]);

  return (<>
  <AuthBar />
  <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <div className="Head-place">{children}</div>
      </div>
      <div className="Head-container">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      </div>
    </div>
  </>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  breadcrumbs: PropTypes.array,
  children: PropTypes.node,
};

export default memo(Head);
