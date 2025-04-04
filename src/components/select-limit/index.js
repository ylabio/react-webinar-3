import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { STRINGS } from '../../const';
import { useAppContext } from '../../app-context';
import './style.css';


// ?TODO: [REFACTOR] Создать Универсальный <select>
function SelectLimit({ changeLimit }) {
  const cn = bem('Limit');
  const { language } = useAppContext();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    changeLimit(+selectedValue);
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{STRINGS.SELECT[language]}</div>
      <select className={cn('select')} onChange={handleChange} defaultValue="10">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}

SelectLimit.propTypes = {
  changeLimit: PropTypes.func.isRequired,
};

export default memo(SelectLimit);
