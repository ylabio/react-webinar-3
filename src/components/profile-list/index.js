import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileList({ children }) {
  const cn = bem('ProfileList');
  return (
    <section className={cn()}>
      <h2 className={cn("caption")}>Профиль</h2>
      <dl className={cn("list")}>
        <dt>Имя:</dt>
        <dd>User 1</dd>
        <dt>Телефон:</dt>
        <dd>+70000000001</dd>
        <dt>Email:</dt>
        <dd>test_50@example.com</dd>
      </dl>
    </section>
  );
}

ProfileList.propTypes = {
  children: PropTypes.node,
};

export default memo(ProfileList);
