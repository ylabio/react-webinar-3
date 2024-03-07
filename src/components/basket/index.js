import React, {useState, useLayoutEffect,useEffect,useRef} from "react";
import PropTypes from 'prop-types';
import "./style.css";
import Head from "../head";
import List from "../list";
import PageLayout from "../page-layout";
import BottomItem from "../bottom-item";
import ModalApp from "../modal";
function BasketApp({showModal,handleClose,list,listBasket,onFunc,action,onAmountPrice,fGetWindowHeight}) {

  /*const fScrollBarBasketA = (numEl) => {
    var vHeight = fGetWindowHeight();
    var vZoom = 2 - (vHeight / vNumForZoom);
    var vHeightA = ((numEl) * 60 + 135) * vZoom;
    return vHeightA;
  }*/
  
 const Basket = () => {
  const vNumForZoom = 776;//100%
  const vNumForContainer = 126;//100%-(126/2*2)

  const ref = useRef(null);

  const [height, setHeight] = useState(0);

  const refList = useRef(null);

  const [heightList, setHeightList] = useState(0);

  const refScroll = useRef(null);

  const [scrollHeight, setScrollHeight] = useState(0);

  const vFlag1 = 0;
  const vFlag2 = 1;
  const vFlag3 = 2;

  useLayoutEffect(() => {
    setHeight(ref.current.clientHeight);
    setHeightList(refList.current.clientHeight);
  });

  useEffect(() => {
    function handleWindowClick() {
      setHeight(400);
      setHeightList(refList.current.clientHeight);
      setScrollHeight(refScroll.current.scrollHeight);
    }

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const fHeightContainer = (flag) => {
    const fAnswer = () => {
      var vHeight = fGetWindowHeight();
      var vHeightContainer = vHeight - (vNumForContainer/vNumForZoom)*vHeight;
      if (vFlag1 == flag) {
        return (Math.floor(vHeightContainer))
      }
      if (vFlag2 == flag) {
        return (Math.floor(vHeightContainer - (height - heightList)));
      }
      return 0;
    }
    
    return (fAnswer())
  }

  function fScrollBarBasket(flag) {
    if (vFlag1 == flag && height >= fHeightContainer(vFlag1)) {
      return true;
    }
    if (vFlag2 == flag && heightList >= fHeightContainer(vFlag2)) {
      return true;
    }
    if (vFlag3 == flag && scrollHeight > heightList && heightList >= fHeightContainer(vFlag2)) {
      return true;
    }
    return false;
  }

    return (
      <div ref={ref}>
      <div style={(fScrollBarBasket(vFlag1) ? {height: fHeightContainer(vFlag1)} : {})}>
      <PageLayout page={action}>
        <div className='LayoutTop'>
          <Head title='Корзина' orange={true}/>
          <div className='Close'>
            <button className='Button-shop' onClick={handleClose}>
              Закрыть
            </button>
          </div>
        </div>
        <div ref={refList}>
        <div ref={refScroll}
             style={(fScrollBarBasket(vFlag2) ? {height: fHeightContainer(vFlag2)} : {})}
             className={`scroll-container ${fScrollBarBasket(vFlag3) ? "show" : ""} `}>
        <List list={list}
              listBasket={listBasket}
              onFunc={onFunc}
              action={action}/>
        </div>
        </div>
        <BottomItem onAmountPrice={onAmountPrice}/>
      </PageLayout>
      </div>
      </div>
    );
  };

  return (
    <ModalApp showModal={showModal} children={Basket()}/>
  );
}

BasketApp.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  itemBasket: PropTypes.shape({
    code: PropTypes.number,
    qproduct: PropTypes.number,
  }).isRequired,
  onFunc: PropTypes.func,
  action: PropTypes.number,
  onAmountPrice: PropTypes.func
};

BasketApp.defaultProps = {
  handleClose: () => {},
  onFunc: () => {},
  onAmountPrice: () => {},
}

export default React.memo(BasketApp);