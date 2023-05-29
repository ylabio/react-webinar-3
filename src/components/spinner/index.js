import { cn as bem} from '@bem-react/classname';
import './style.css';

function Spinner(props) {
  const cn = bem('Spinner');
  return <div className={cn('center')}>
    <div className={cn()}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
}

export default Spinner;
