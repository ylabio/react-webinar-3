import { memo } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Row({ title, value }) {
  const cn = bem('Table');

  return (
    <tr className={cn('row')}>
      <td className={cn('name')}>{title}</td>
      <td className={cn('value')}>{value}</td>
    </tr>
  );
}

Row.propTypes = {
  title: PropTypes.string,
  value: oneOfType([PropTypes.string, PropTypes.number])
};

export default memo(Row);