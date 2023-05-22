import React, { useContext } from 'react';
import { Context } from '../context';
import { constructIntl } from '../../utils';
import PropTypes from 'prop-types';
import Head from "../head";
import List from "../list";
import './style.css'

function Modal({activeModal, callback, allPrice}) {
    const { defaultContext, modifiedContext } = useContext(Context);

    return (
        <div className={'container_modal' + (activeModal ? ' active': '')}>
            <div className="container_modal_wrapper">
                <div className="container_modal_wrapper-busket">

                <Head title={'Корзина'} modal={true} callback={callback}/>
                <List list={defaultContext} modal={true} />

                <div className="container_resul">
                    {!defaultContext.length ? <h1 className="title_empty">Пусто</h1> : <><span className="resul_text"><b>Итого:</b></span><span><b>{constructIntl({method: 'NumberFormat', value: allPrice})}</b></span></>}
                </div>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    activeModal: PropTypes.bool,
    callback: PropTypes.func,
    allPrice: PropTypes.number,
};

Modal.defaultProps = {
    callback: () => {},
}

export default React.memo(Modal);