import React, { useRef, useEffect } from 'react';
import Icon from '../icon';
import './style.css';

function Modal({
  children,
  opened = false,
  close = () => {},
}) {
  const parent = useRef(null);

  useEffect(() => {
    if (parent.current && opened) {
      parent.current.showModal();

      parent.current.addEventListener('close', close);
    } else {
      parent.current?.close();
    }

    return () => {
      parent.current?.removeEventListener('close', close);
    };
  }, [parent, opened, close]);

  return (
    <dialog className="Modal" ref={parent}>
      {children}

      <button className="Modal-button" onClick={close}>
        <Icon name="close" />
      </button>
    </dialog>
  );
}

export default React.memo(Modal);
