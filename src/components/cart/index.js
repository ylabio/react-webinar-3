import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Head from "../head";
import List from "../list";
import Footer from "../footer";

function Cart({ cart, title, total, onCloseCart, onRemoveItem }) {
	return (
		<div className='Layout'>
			<div className={'Cart'}>
				<Head title={title}><button style={{margin: '30px'}} onClick={onCloseCart}>Закрыть</button></Head>
				{ cart.length ? <List list={cart} onClick={onRemoveItem} isForCart={true} /> :
					<div className='Cart-empty'>Пусто</div> }
				<Footer total={total} />
			</div>
		</div>
	);
}

Cart.propTypes = {
	title: PropTypes.string,
	cart: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.number
	})),
	total: PropTypes.number,
	onCloseCart: PropTypes.func,
	onRemoveItem: PropTypes.func
};

Cart.defaultProps = {
	onCloseCart: () => {},
	onRemoveItem: () => {},
}

export default React.memo(Cart);