import React from "react";
import { Link } from "react-router-dom";
import Button from "../button";


const NotFound = () => {
  return (
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          marging: 'auto',
          alignItems: 'center',
          paddingTop: 180
          }}>
      <h2 className='text text_type_main-large'>Страница не найдена</h2>
      <Link to={"/"}>
          <Button title="Назад" style="primary"></Button>
        </Link>
  </div>
      )
}

export default NotFound;
