import {memo, useLayoutEffect, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Scrollbar from "../../components/scrollbar"

function ScrollBarMain({children}) {
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
    function handleResize() {
      if (store.actions.modals.fInnerHeight() == false) {
      store.actions.modals.setinnerHeight();
      store.actions.modals.setheightList(refList.current.clientHeight);
      if (store.actions.modals.fScrollBarBasket(select.vFlag2) == true) {
        store.actions.modals.setheightListToList(store.actions.modals.fHeightContainer(select.vFlag2));
      }
      store.actions.modals.setscrollHeight(refScroll.current.scrollHeight);
      }
    }
    store.actions.modals.setheightList(refList.current.clientHeight);
    if (store.actions.modals.fScrollBarBasket(select.vFlag2) == true) {
      store.actions.modals.setheightListToList(store.actions.modals.fHeightContainer(select.vFlag2));
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
  }, [store,refScroll]);

  return (
        <div ref={refList}>
        <Scrollbar refScroll={refScroll} heightListToList={(store.actions.modals.fScrollBarBasket(select.vFlag2) &&
                          select.heightListToList > 0 &&
                          store.actions.modals.fScrollBarBasket(select.vFlag1) ?
                  select.heightListToList
                  : 0)}
                   children={children}
                   show={store.actions.modals.fScrollBarBasket(select.vFlag3)}/>
        </div>
  );
}

ScrollBarMain.propTypes = {
  children: PropTypes.node,
}

ScrollBarMain.defaultProps = {};

export default memo(ScrollBarMain);
