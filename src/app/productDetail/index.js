
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Head from "../../components/head";
import BasketTool from '../../components/basket-tool';

function ProductDetail() {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    
  }, [id]);

  return (
    <div className='div_detail'>
     <Head title="Магазин" />
     <BasketTool/>
    </div>
  );
}


export default ProductDetail;
