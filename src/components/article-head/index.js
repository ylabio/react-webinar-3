import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '../../hooks/useTranslation';
import Head from '../head';
import './style.css';

function ArticleHead({ title }) {
  return (
    <Head title={title} />
  );
}

ArticleHead.propTypes = {
  title: PropTypes.string,
};

export default memo(ArticleHead);