import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import SideLayout from "../side-layout";

function CommentsAmount({amount}) {

  const cn = bem("CommentsAmount")
  return (
      <SideLayout side="start">
        <p className={cn()}>{`Комментарии (${amount})`}</p>
      </SideLayout>
  );
}

CommentsAmount.propTypes = {
  amount: PropTypes.number,
};

CommentsAmount.defaultProps = {
  amount: 0,
}

export default memo(CommentsAmount);
