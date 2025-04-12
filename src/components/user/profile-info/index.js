import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileInfo({ user }) {

  if (!user) {
    return <div>Loading...</div>;
  }

  const { profile } = user ;

  const cn = bem('Profile-Info');
  return (
    <section className={cn()}>
      <h2 className={cn("caption")}>Профиль</h2>
      <dl className={cn("list")}>
        <dt>Имя:</dt>
        <dd>{profile?.name}</dd>
        <dt>Телефон:</dt>
        <dd>{profile?.phone}</dd>
        <dt>Email:</dt>
        <dd>{user.email}</dd>
      </dl>
    </section>
  );
}

export default memo(ProfileInfo);
