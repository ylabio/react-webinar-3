import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Loader() {
  const cn = bem('Loader');

  return (
    <div className={cn()}>
      Загрузка...
    </div>
  );
}

export default memo(Loader);
