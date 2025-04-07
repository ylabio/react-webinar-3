import { useRouteError, Link } from 'react-router';
import { cn as bem } from '@bem-react/classname'
import React from 'react';
import "./style.css"

export default function ErrorComponent (){
    const error = useRouteError();
    console.error(error);
  
    const cn = bem("Error")
  
    return (
      <div className={cn()}>
        <h1>Ooops!</h1>
        <p>Somthing went wrong</p>
        <p className={cn("details")}>
          {error?.statusText || error?.message}
          {error?.status && ` (${error.status})`}
        </p>
        <Link to="/" className={cn("link")}>
          Back to home
        </Link>
      </div>
    );
}