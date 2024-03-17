import { memo } from "react";
import {cn as bem} from "@bem-react/classname";
import SideLayout from "../../components/side-layout";
import './style.css';

function LoginNav(props) {
  const cn = bem('LoginNav');
  return (
    <SideLayout side='end' padding='medium'>
      <div className={cn()}>
        <button onClick={props.onClick}>{props.title}</button>
      </div>
    </SideLayout>

  )
}

export default memo(LoginNav);