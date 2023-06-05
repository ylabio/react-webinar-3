import './style.css'
import { cn as bem } from "@bem-react/classname";

const ProfileLayout = ({ children, gap, p }) => {
  const cn = bem('ProfileLayout');
  return <div className={cn({gap, p})}>{children}</div>;
};

export default ProfileLayout;