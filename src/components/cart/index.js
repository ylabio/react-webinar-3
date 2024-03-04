import React from "react"
import PageLayout from "../page-layout"
import Head from "../head"
import List from "../list"
import './style.css';
import { numberFormat } from "../../utils";

const Cart = ({ cart, closeModal, deleteFromCart }) => {
    return (
        <div className="Cart">
            <PageLayout>
                <Head title={'Корзина'} >
                    <div className="Head-btn">
                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </Head>
                <List action={deleteFromCart} list={cart.items} type='cart' />
                <div className="Cart-total">
                    <span>Итого</span>
                    <span>{numberFormat(cart.sum)} ₽</span>
                </div>
            </PageLayout>
        </div>)
}
export default React.memo(Cart)