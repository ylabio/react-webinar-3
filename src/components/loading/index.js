import React from "react";
import useTranslate from '../../store/use-translate';
import "./style.css";

const Loading = () => {
  return <div className="loading">{useTranslate('loading')}</div>;
};

export default Loading;
