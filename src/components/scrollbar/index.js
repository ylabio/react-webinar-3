import {memo, useLayoutEffect, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import './style.css';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function ScrollBar({children}) {
  const store = useStore();

  const select = useSelector(state => ({
    heightFrame: state.modals.heightFrame,
    heightList: state.modals.heightList,
    vFlag1: state.modals.vFlag1,
    vFlag2: state.modals.vFlag2,
    vFlag3: state.modals.vFlag3,
    scrollHeight: state.modals.scrollHeight,
    heightListToList: state.modals.heightListToList,
  }));

  const refList = useRef(null);
  const refScroll = useRef(null);

  useLayoutEffect(() => {
    store.actions.modals.setheightList(refList.current.clientHeight);
    if (store.actions.modals.fScrollBarBasket(select.vFlag2) == true) {
      store.actions.modals.setheightListToList(store.actions.modals.fHeightContainer(select.vFlag2));
    }
  }, [store,select]);

  useEffect(() => {
    function handleWindowClick() {
      store.actions.modals.setheightList(refList.current.clientHeight);
      if (store.actions.modals.fScrollBarBasket(select.vFlag2) == true) {
        store.actions.modals.setheightListToList(store.actions.modals.fHeightContainer(select.vFlag2));
      }
      store.actions.modals.setscrollHeight(refScroll.current.scrollHeight);
    }

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [store]);

  return (
        <div ref={refList}>
        <div ref={refScroll}
             style={(store.actions.modals.fScrollBarBasket(select.vFlag2) &&
                     select.heightListToList > 0 &&
                     store.actions.modals.fScrollBarBasket(select.vFlag1) ?
             {height: select.heightListToList}
             : {})}
             className={`scroll-container ${store.actions.modals.fScrollBarBasket(select.vFlag3) ? "show" : ""} `}>
      {children}
        </div>
        </div>
  );
}

ScrollBar.propTypes = {
  children: PropTypes.node,
}

ScrollBar.defaultProps = {};

export default memo(ScrollBar);
