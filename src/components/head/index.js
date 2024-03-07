import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Head(props) {

  const cn = bem('Head');

  return (
    <div className={props.classModifier ? cn({[props.classModifier]: true}) : cn()}>
      <h1 className={cn('title')}>{props.title}</h1>
      {props.children}
    </div>
  )
}

Head.propTypes = {
  classModifier: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node
};

export default React.memo(Head);
