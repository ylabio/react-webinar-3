import { memo } from 'react';
import PropTypes from 'prop-types';
import Head from '../head';

function AppLayout({ title, authSlot, children }) {
  return (
    <>
      <Head title={title} authSlot={authSlot} />
      {children}
    </>
  );
}

AppLayout.propTypes = {
  title: PropTypes.string.isRequired,
  authSlot: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default memo(AppLayout);
