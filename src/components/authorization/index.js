import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";

function Authorization(props) {

  const cn = bem('Authorization');

  if (props.isAuth) {
    return (
      <div className={cn()}>
        <Link className={cn('user')} to={props.profile}>{props.login}</Link>
        <button onClick={props.onLogout}>{props.title}</button>
      </div>
    )
  }

  return (
    <div className={cn()}>
      <Link className={cn('link')} to={props.link}>{props.title}</Link>
    </div>
  );
}

export default Authorization;