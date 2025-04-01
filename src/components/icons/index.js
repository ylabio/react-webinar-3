import React from 'react';
import CartSvg from '../../assets/icons/cart.svg';
import CloseSvg from '../../assets/icons/close.svg';

export const CartIcon = ({ className, width = 24, height = 24 }) => (
  <CartSvg className={className} width={width} height={height} />
);

export const CloseIcon = ({ className, width = 32, height = 32 }) => (
  <CloseSvg className={className} width={width} height={height} />
); 
