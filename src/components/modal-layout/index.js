import {memo, useEffect, useRef, useLayoutEffect} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
function ModalLayout(props) {

  const store = useStore();

  const select = useSelector(state => ({
    heightFrame: state.modals.heightFrame,
    heightList: state.modals.heightList,
    vFlag1: state.modals.vFlag1,
    vFlag2: state.modals.vFlag2,
    vFlag2: state.modals.vFlag3,
  }));

  const cn = bem('ModalLayout');

  // Корректировка центра, если модалка больше окна браузера.
  const layout = useRef();
  const frame = useRef();

  useLayoutEffect(() => {
    if (store.actions.modals.fScrollBarBasket(select.vFlag1) == true) {
        store.actions.modals.setheightFrame(store.actions.modals.fHeightContainer(select.vFlag1));
    }
    else {
      store.actions.modals.setheightFrame(frame.current.clientHeight);
    }
  }, [store,select]);

  useEffect(() => {
    function handleWindowClick() {
      if (store.actions.modals.fScrollBarBasket(select.vFlag1) == true) {
        if (select.heightFrame == store.actions.modals.fHeightContainer(select.vFlag1)) {
          store.actions.modals.setheightFrame(store.actions.modals.fHeightContainer(select.vFlag1) - 1);
        }
      }
    }

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [store,select]);

  /*useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Центрирование frame или его прижатие к краю, если размеры больше чем у layout
      layout.current.style.alignItems = (layout.current.clientHeight < frame.current.clientHeight)
        ? 'flex-start'
        : 'center';
      layout.current.style.justifyContent = (layout.current.clientWidth < frame.current.clientWidth)
        ? 'flex-start'
        : 'center';
    });
    // Следим за изменениями размеров layout
    //resizeObserver.observe(layout.current);
    resizeObserver.observe(frame.current);
    return () => {
      resizeObserver.disconnect();
    }
  }, [store,select,frame]);*/

  return (
    <div className={cn()} ref={layout}>
      <div className={cn('frame')} ref={frame} style={(store.actions.modals.fScrollBarBasket(select.vFlag1) ?
                                                      {height: select.heightFrame} : {})}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>{props.title}</h1>
          <button className={cn('close')} onClick={props.onClose}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

ModalLayout.defaultProps = {
  title: 'Модалка',
  onClose: () => {}
};

export default memo(ModalLayout);
