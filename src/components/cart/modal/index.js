import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import './style.css';
import Item from "../../item";
import Head from "../../head";
import List from "../../list";
import { sumGoods } from "../../../utils";
import { modalList } from "../../../config";

function Modal(props) {

    console.log("Modal")

    const modal = useRef(null);

    useEffect(() => {
        if (props.isShowModal) {
            modal.current.showModal();
        }
        else {
            modal.current.close();
        }
    }, [props.isShowModal])

    const controls = useRef([{name: 'Закрыть', action: () => props.onShowModal(false)}]);

    return (
        <dialog ref={modal} className={'Modal' + (!props.isShowModal ? ' Modal_hidden' : '')}>
            <Head title={'Корзина'}  actions={controls}/>
            <List list={props.list} show={modalList} onAddItem={props.onAddItem} onDeleteItem={props.onDeleteItem}/>
            <div className='Modal-sum'>
                <div className='Cell'>&nbsp;</div>
                <div className="Cell Cell_main">&nbsp;</div>
                <div className="Cell">Итого:</div>
                <div className="Cell">{sumGoods(props.list)}</div>
                <div className="Cell Cell_end">&nbsp;</div>
            </div>
        </dialog>
    )
}

Modal.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  isShowModal: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
  onShowModal: PropTypes.func,
};

Modal.defaultProps = {
  onDeleteItem: () => {
  },
  onAddItem: () => {
  },
  onShowModal: () => {
  },
  isShowModal: false,
};

export default React.memo(Modal);