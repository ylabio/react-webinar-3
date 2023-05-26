import React, {useEffect, useState} from "react";
import './index.scss';

function Pagenation(props) {
  return (
    <div>
      <div>1</div>
      <div>...</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>...</div>
      <div>20</div>
    </div>
  )
}

export default React.memo(Pagenation);