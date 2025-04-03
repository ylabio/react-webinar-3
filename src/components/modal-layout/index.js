import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo, useEffect, useRef } from 'react';
import './style.css';

function ModalLayout({ title = 'Модалка', children, onClose = () => {} }) {
  const cn = bem('ModalLayout');

  // Корректировка центра, если модалка больше окна браузера.
  const layout = useRef(null);
  const frame = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Центрирование frame или его прижатие к краю, если размеры больше чем у layout
      if (layout.current && frame.current) {
        layout.current.style.alignItems =
          layout.current.clientHeight < frame.current.clientHeight ? 'flex-start' : 'center';
        layout.current.style.justifyContent =
          layout.current.clientWidth < frame.current.clientWidth ? 'flex-start' : 'center';
      }
    });

    // Следим за изменениями размеров layout
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

export default memo(ModalLayout);
