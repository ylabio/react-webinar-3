import React from 'react';
import Portal from "../../components/portal";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import useSelector from "../../store/use-selector";

export const Index = () => {
  const cn = bem('Spinner');


  const select = useSelector(state => ({
    isLoading: state.catalog.isLoading || state.basket.isLoading || state.product.isLoading
  }));

  return select.isLoading ? (
    <Portal>
      <div className={cn()}/>
    </Portal>
  ) : null;
};
