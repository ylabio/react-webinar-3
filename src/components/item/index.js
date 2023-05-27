import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import {NavLink} from "react-router-dom";

function Item(props) {
	
	const cn = bem('Item');
	
	const callbacks = {
		onAdd: (e) => props.onAdd(props.item._id)
	}
	
	return (
		<div className={cn()}>
			{/*<div className={cn('code')}>{props.item._id}</div>*/}
			<div className={cn('title')}
           onClick={() => props.setIdProduct(props.item._id)}>
					<NavLink to={`/product/${props.item._id}`}
                   className={cn('nav')}>
						{props.item.title}
					</NavLink>
			</div>
			<div className={cn('actions')}>
				<div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
				<button onClick={callbacks.onAdd}>{props.lang.button.add}</button>
			</div>
		</div>
	);
}

Item.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		title: PropTypes.string,
		price: PropTypes.number
	}).isRequired,
	lang: PropTypes.object.isRequired,
	onAdd: PropTypes.func,
	setIdProduct: PropTypes.func.isRequired,
};

Item.defaultProps = {
	onAdd: () => {
	},
	setIdProduct: () => {
	},
}

export default memo(Item);
