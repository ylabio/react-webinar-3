import {memo} from "react";
// import PropTypes from 'prop-types';
import SideLayout from "../../components/side-layout";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard({t, name, email, phone}) {

  const cn = bem('ProfileCard');
  return (
    <SideLayout side='start' padding='medium'>
    <div className={cn()}>
      <h2 className={cn('title')}>{t('login.profile')}:</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('login.loginName')}:</div>
        <div className={cn('value')}>{name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('login.phone')}:</div>
        <div className={cn('value')}>{phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('login.email')}:</div>
        <div className={cn('value')}>{email}</div>
      </div>
    </div>
    </SideLayout>
  );
}

// ProfileCard.propTypes = {
//   article: PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     description: PropTypes.string,
//     madeIn: PropTypes.object,
//     category: PropTypes.object,
//     edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     price: PropTypes.number
//   }).isRequired,
//   onAdd: PropTypes.func,
//   t: PropTypes.func
// };

// ProfileCard.defaultProps = {
//   onAdd: () => {
//   },
//   t: (text) => text
// }

export default memo(ProfileCard);
