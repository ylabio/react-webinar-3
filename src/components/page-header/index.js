import React from 'react';
import './style.css'
import Head from "../head";
import LangSelect from "../lang-select";
import PropTypes from "prop-types";

const PageHeader = ({ title, lang, changeLang, inProductPage }) => {
  return (
    <div className='PageHeader'>
      <Head title={title} lang={lang} inProductPage={inProductPage} />
      <LangSelect lang={lang} changeLang={changeLang} />
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string,
  lang: PropTypes.string,
  inProductPage: PropTypes.bool,
  changeLang: PropTypes.func
}

PageHeader.defaultProps = {
  changeLang: () => {}
}

export default React.memo(PageHeader);
