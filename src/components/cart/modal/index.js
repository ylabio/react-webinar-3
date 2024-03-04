import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import './style.css';
import Item from "../../item";
import Head from "../../head";
import List from "../../list";
import { sumGoods } from "../../../utils";

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

    return (
        <dialog ref={modal} className={'Modal' + (!props.isShowModal ? ' Modal_hidden' : '')}>
            <Head title={'Корзина'}  controls={
                <div className='Head-actions'>
                    <button onClick={() => props.onShowModal(false)}>Закрыть</button>
                </div>
            }/>
            <List list={props.list} show={['code', 'title', 'price', 'count', 'delete']} onAddItem={props.onAddItem} onDeleteItem={props.onDeleteItem}/>
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