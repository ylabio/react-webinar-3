import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { cn as bem} from '@bem-react/classname';

function Head({title, roundCorners}) {

  const cn = bem('Head');

  return (
    <div className='Head' style={roundCorners ? roundCorners : {}}>
      <h1 className={cn('title')}>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node
};

export default React.memo(Head);
