import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal(props) {
	let allProductArr = props.store.getAllItemInBucket();
	let allPrice = props.store.getPrice();

  const handleDeleteClick = (code) => {
		props.store.deleteItemInBucket(code);
	};

	return (
		<section className={`Modal ${props.active ? 'open' : ''}`}>
			<div className="Modal-box">
				<div className="Modal-header">
					<b>{props.title}</b>
					<button onClick={props.onOpenModal}>Закрыть</button>
				</div>
				<div className="Modal-body">
					{allProductArr.map((product) => {
						return (
							<div className="Modal-item" key={product.code}>
								<div className="Modal-item__left">
									<div className="Modal-code">{product.code}</div>
									<div className="Modal-title">{product.title}</div>
								</div>
								<div className="Modal-item__right">
									<div className="Modal-price">{props.store.getFormatedPrice(product.price)} ₽</div>
									<div className="Modal-count">{product.count} шт</div>
									<div className="Modal-actions">
                  <button onClick={() => handleDeleteClick(product.code)}>Удалить</button>
									</div>
								</div>
							</div>
						);
					})}
					<div className="Modal-all-count">
						<b>Итого</b>
						<b>{props.store.getFormatedPrice(allPrice)}₽</b>
					</div>
				</div>
			</div>
		</section>
	);
}

Modal.propTypes = {
	active: PropTypes.bool.isRequired,
	onOpenModal: PropTypes.func,
  store: PropTypes.object.isRequired,
};

Modal.defaultProps = {
	onOpenModal: () => {},
};

export default Modal;
