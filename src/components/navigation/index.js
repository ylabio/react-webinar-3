import React from 'react';
import {Link} from 'react-router-dom';
import BasketTool from '../basket-tool';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {useLanguage} from '../../translation/language-context';

function Navigation(props) {
  const cn = bem('Product');
  const {translation} = useLanguage();

  return (
    <div className={cn('menu')}>
      <Link className={cn('link')} to={`/`}>
        {translation['product.main.link']}
      </Link>
      <BasketTool
        onOpen={props.onOpen}
        amount={props.amount}
        sum={props.sum}
      />
    </div>
  );
}

export default Navigation;
