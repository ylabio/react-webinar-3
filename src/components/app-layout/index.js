import { memo } from 'react';
import PropTypes from 'prop-types';
import Head from '../head';

function AppLayout({ title, authSlot, headChildren, children }) {
  return (
    <>
      <Head title={title} authSlot={authSlot}>
        {headChildren}
      </Head>
      {children}
    </>
  );
}

AppLayout.propTypes = {
  title: PropTypes.string.isRequired,
  authSlot: PropTypes.node.isRequired,
  headChildren: PropTypes.node, // добавили
  children: PropTypes.node.isRequired,
};

export default memo(AppLayout);
