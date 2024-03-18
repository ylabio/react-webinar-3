import { cn as bem } from "@bem-react/classname";
import "./style.css";

const UserInf = ({ result }) => {
  const cn = bem("UserProfil");

  return (
    <div className={cn()}>
      <div className={cn() + "-Title"}>Профиль</div>
      <div>
        Имя: <b>{result.username}</b>
      </div>
      <div>
        Телефон: <b>{result.profile?.phone}</b>
      </div>
      <div>
        email: <b>{result.email}</b>
      </div>
    </div>
  );
};

export default UserInf;
