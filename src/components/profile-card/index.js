import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ title, params }) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <div className={cn('main-title')}>{title}</div>
      <div className={cn('container')}>
        <div className={cn('container-title')}>
          {params?.map((param, index) => (
            <div key={`${param.title}${index}`} className={cn('title')}>{`${param.title} :`}</div>
          ))}
        </div>
        <div className={cn('container-value')}>
          {params?.map((param, index) => (
            <div key={`${param.value}${index}`} className={cn('value')}>{param.value}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  params: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.oneOf([null, undefined])
      ]),
    })
  ),
};

export default memo(ProfileCard);
