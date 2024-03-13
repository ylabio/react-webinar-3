import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Menu({children}) {

  const cn = bem('Menu');

  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

export default memo(Menu);
