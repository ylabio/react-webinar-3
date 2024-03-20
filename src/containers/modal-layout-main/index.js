import {memo, useEffect, useRef, useLayoutEffect} from "react";
import PropTypes from "prop-types";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import ModalLayout from "../../components/modal-layout";

function ModalLayoutMain(props) {

  const store = useStore();

  const select = useSelector(state => ({
    heightFrame: state.modals.heightFrame,
    heightList: state.modals.heightList,
    vFlag1: state.modals.vFlag1,
    vFlag2: state.modals.vFlag2,
    vFlag2: state.modals.vFlag3,
  }));

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

  return (
    <ModalLayout title={props.title}
                 onClose={props.onClose}
                 labelClose={props.labelClose}
                 frame={frame}
                 children={props.children}
                 heightFrame={(store.actions.modals.fScrollBarBasket(select.vFlag1) ? select.heightFrame : 0)}/>
  );
}

ModalLayoutMain.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  labelClose: PropTypes.string,
};

ModalLayoutMain.defaultProps = {
  title: 'Модалка',
  onClose: () => {}
};

export default memo(ModalLayoutMain);
