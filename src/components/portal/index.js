import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

function Portal({ children }) {
  const portalRootRef = useRef(document.createElement('div'));

  useEffect(() => {
    const portalRoot = portalRootRef.current;
    document.body.appendChild(portalRoot);
    return () => {
      document.body.removeChild(portalRoot);
    };
  }, []);

  return createPortal(children, portalRootRef.current);
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Portal;
