import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import formattedDate from "../../../utils/formattedDate";
import FormComments from "../form-comments";
import AuthAlert from "../auth-alert";
import { memo } from "react";

function ItemComments({
  item,
  action,
  textBtn,
  disabledBtn,
  userId,
  isAuth,
  visibleForm,
  children,
  onSubmit,
  onCloseForm,
}) {
  const cn = bem("ItemComments");
  return (
    <div
      className={cn()}
      style={{ paddingLeft: `${item.level && 30 * item.level}px` }}
    >
      <div className={cn("head")}>
        <div
          className={`${cn("head-user_name")} ${
            userId === item.author._id && cn("head-author")
          }`}
        >
          {item.author.profile.name}
        </div>
        <div className={cn("head-date")}>{formattedDate(item.dateUpdate)}</div>
      </div>
      <div className={cn("text")}>{item.text}</div>
      <button
        className={cn("action")}
        disabled={disabledBtn}
        onClick={() => action(item._id)}
      >
        {textBtn}
      </button>
      {visibleForm && (
        <div className={cn("form")}>
          {isAuth ? (
            <FormComments
              id={item._id}
              label="Новый ответ"
              labelBtn="Отправить"
              cb={onSubmit}
              labelBtn2={"Отмена"}
              cb2={onCloseForm}
            />
          ) : (
            <AuthAlert
              text=", чтобы иметь возможность ответить."
              labelBtn={"Отмена"}
              cb={onCloseForm}
            >
              {children}
            </AuthAlert>
          )}
        </div>
      )}
    </div>
  );
}

ItemComments.propTypes = {
  item: PropTypes.shape({}),
  action: PropTypes.func.isRequired,
  textBtn: PropTypes.string,
  disabledBtn: PropTypes.bool,
  isAuth: PropTypes.bool,
  user: PropTypes.string,
  visibleForm: PropTypes.bool,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  onCloseForm: PropTypes.func,
};

ItemComments.defaultProps = {};

export default memo(ItemComments);
