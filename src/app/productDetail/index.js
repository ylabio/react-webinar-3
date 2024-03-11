import React from "react";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function ProductDetail() {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
      store.a
  }, [id]);

  return (
    <div>
      <h2>Описание товара</h2>
      <p>{description}</p>
    </div>
  );
}


export default ProductDetail;
