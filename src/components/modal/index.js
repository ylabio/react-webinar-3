import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import './style.css';
import Item from "../item-main";
import Head from "../head";
import List from "../list";
import { sumGoods } from "../../utils";
import { modalList } from "../../config";

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
            {props.head}
            <div className="Modal-contents">
                {props.children}
            </div>
        </dialog>
    )
}

Modal.propTypes = {
  head: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  isShowModal: PropTypes.bool,
};

Modal.defaultProps = {
    isShowModal: false,
}

export default React.memo(Modal);