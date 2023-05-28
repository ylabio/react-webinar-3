import { memo } from 'react';
import './style.css';

function ContainerSpaceBetween({ children }) {
  return <div className='ContainerSpaceBetween'>{children}</div>;
}

export default memo(ContainerSpaceBetween);
