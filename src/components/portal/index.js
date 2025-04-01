import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const PORTAL_ERROR_MSG ='There is no portal container in markup. Please add portal container with proper id attribute.';

export const createContainer = ({id, mountNode = document.body}) => {
  if (document.getElementById(id)) {
    return;
  }
  const portalContainer = document.createElement('div');

  portalContainer.setAttribute('id', id);
  mountNode.appendChild(portalContainer);
};

const Portal = ({id, children}) => {
  const [container, setContainer] = useState();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);

      if (!portalContainer) {
        throw new Error(PORTAL_ERROR_MSG);
      }

      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : null;
};

Portal.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Portal