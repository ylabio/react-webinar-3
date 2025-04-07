import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ title = 'Модалка', onClose = () => {}, children }) {
  const cn = bem('ModalLayout');

  // Корректировка центра, если модалка больше окна браузера.
  const layout = useRef();
  const frame = useRef();

  useEffect(() => {
    const layoutElement = layout.current;
    const frameElement = frame.current;
    
    if (!layoutElement || !frameElement) return;
    
    const resizeObserver = new ResizeObserver(() => {
      // Центрирование frame или его прижатие к краю, если размеры больше чем у layout
      if (layoutElement && frameElement) {
        layoutElement.style.alignItems =
          layoutElement.clientHeight < frameElement.clientHeight ? 'flex-start' : 'center';
        layoutElement.style.justifyContent =
          layoutElement.clientWidth < frameElement.clientWidth ? 'flex-start' : 'center';
      }
    });
    // Следим за изменениями размеров layout
    resizeObserver.observe(layout.current);
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
