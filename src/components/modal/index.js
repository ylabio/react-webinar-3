import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import List from "../list";

function Modal({setOpen, listOfProducts,onButtonAction,totalProductPrice}) {
	let buttonTitle='Удалить'
  return (
    <div className='Modal'>
      <div className="Modal__content">
				<div className="Modal__header">
					<h2 className='Modal__title'>Корзина</h2>
					<button onClick={()=>setOpen(false)}>Закрыть</button>
				</div>
				<div className="Modal__body">
					<List list={listOfProducts} onButtonAction={onButtonAction} buttonTitle={buttonTitle}/>
					<div className="Modal__count">
						<span>Итого</span>
						<span>{totalProductPrice} ₽</span>
					</div>
				</div>
			</div>
    </div>
  )
}

Modal.propTypes = {
	setOpen: PropTypes.func,
	listOfProducts: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
	onButtonAction:PropTypes.func,
	totalProductPrice:PropTypes.number,
};

Modal.defaultProps = {
	setOpen: () => {},
	listOfProducts:[]
}

export default React.memo(Modal);
