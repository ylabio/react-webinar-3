import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ title = 'Модалка', onClose = () => {}, children }) {
  const cn = bem('ModalLayout');

  const layout = useRef();
  const frame = useRef();
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const layoutEl = layout.current;
      const frameEl = frame.current;

      if (!layoutEl || !frameEl) return;

      layoutEl.style.alignItems =
        layoutEl.clientHeight < frameEl.clientHeight ? 'flex-start' : 'center';

      layoutEl.style.justifyContent =
        layoutEl.clientWidth < frameEl.clientWidth ? 'flex-start' : 'center';
    });

    if (layout.current) {
      resizeObserver.observe(layout.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={cn()} ref={layout}>
      <div className={cn('frame')} ref={frame}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>{title}</h1>
          <button className={cn('close')} onClick={onClose} />
        </div>
        <div className={cn('content')}>{children}</div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

// ModalLayout.defaultProps = {
//   title: 'Модалка',
//   onClose: () => {},
// };

export default memo(ModalLayout);
