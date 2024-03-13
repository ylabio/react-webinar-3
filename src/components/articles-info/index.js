import React, { memo } from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ArticlesInfo({ articles, textBtn, dataTranslate, action }) {
  const cn = bem("Articles-info");

  return (
    <div className={cn()}>
      <p className={cn("description")}>{articles.description}</p>
      <p>
        {dataTranslate.madeIn}:{" "}
        <span className={cn("madeIn")}>
          {articles.madeIn.title} ({articles.madeIn.code})
        </span>
      </p>
      <p>
        {dataTranslate.category}:{" "}
        <span className={cn("category")}>{articles.category.title}</span>
      </p>
      <p>
        {dataTranslate.edition}:{" "}
        <span className={cn("edition")}>{articles.edition}</span>
      </p>
      <p className={cn("price")}>
        {dataTranslate.price}: {numberFormat(articles.price)} ₽
      </p>
      <button className={cn("action")} onClick={action}>
        {textBtn}
      </button>
    </div>
  );
}

ArticlesInfo.propTypes = {
  articles: PropTypes.shape({
    price: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    edition: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
      _id: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
      _id: PropTypes.string,
    }),
  }),
  textBtn: PropTypes.string,
  dataTranslate: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
};

ArticlesInfo.defaultProps = {
  articles: {
    price: "",
    title: "",
    description: "",
    edition: 0,
    madeIn: {
      title: "",
      code: "",
      _id: "",
    },
    category: {
      title: "",
      _id: "",
    },
  },
  textBtn: "Добавить",
};
export default memo(ArticlesInfo);
