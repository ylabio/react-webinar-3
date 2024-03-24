import React, { memo, useCallback, useState } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

function FormComments({ cb, label, labelBtn, id, labelBtn2, cb2 }) {
  const cn = bem("FormComments");
  const [value, setValue] = useState("");

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      cb(value, id);
      setValue("");
    },
    [value]
  );

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <label className={cn("label")} htmlFor="textarea">
        {label}
      </label>
      <textarea
        id="textarea"
        className={cn("textarea")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={cn("group_btn")}>
        <button disabled={!value} className={cn("action")} type="submit">
          {labelBtn}
        </button>
        {labelBtn2 && cb2 && (
          <button className={cn("action")} onClick={cb2} type="button">
            {labelBtn2}
          </button>
        )}
      </div>
    </form>
  );
}

FormComments.propTypes = {
  cb: PropTypes.func.isRequired,
  label: PropTypes.string,
  labelBtn: PropTypes.string.isRequired,
  id: PropTypes.string,
  labelBtn2: PropTypes.string,
  cb2: PropTypes.func,
};

FormComments.defaultProps = {};

export default memo(FormComments);
