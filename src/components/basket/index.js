import React from "react";
//import Modal from "react-overlays/Modal";
import PropTypes from 'prop-types';
import "./style.css";
import Head from "../head";
import List from "../list";
import PageLayout from "../page-layout";
import BottomItem from "../bottom-item";

function ModalApp({showModal,handleClose,list,listBasket,onFunc,action,onAmountPrice}) {

  //const renderBackdrop = (props) => <div className="container" {...props} />;
  const Modal = ({ show }) => {
    return (
      <>
       <div
          className={`modalContainer ${show ? "show" : ""} `}
        >
            <div className='backdrop' />
            <div className='modal' >
              <PageLayout page={action}>
                <div className='LayoutTop'>
                <Head title='Корзина' orange={true}/>
                <div className='Close'>
                <button className='Button-shop' onClick={handleClose}>
                  Закрыть
                </button>
                </div>
                </div>
                <List list={list}
                      listBasket={listBasket}
                      onFunc={onFunc}
                      action={action}/>
                {<BottomItem onAmountPrice={onAmountPrice}/>}
              </PageLayout>
            </div>
        </div>
      </>
    );
  };

  /*const element = <Modal
  //className={classNameModal}
  //show={showModal}
  //onHide={handleClose}
  //renderBackdrop={renderBackdrop}
>
<PageLayout page={action}>
  <div className='LayoutTop'>
  <Head title='Корзина' orange={true}/>
  <div className='Close'>
  <button className='Button-shop' onClick={handleClose}>
    Закрыть
  </button>
  </div>
  </div>
  <List list={list}
        listBasket={listBasket}
        onFunc={onFunc}
        action={action}/>
  {<BottomItem onAmountPrice={onAmountPrice}/>}
</PageLayout>
</Modal>*/

  return (
    <Modal show={showModal} />
  );
}

ModalApp.propTypes = {
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

ModalApp.defaultProps = {
  handleClose: () => {},
  onFunc: () => {},
  onAmountPrice: () => {},
}

export default React.memo(ModalApp);