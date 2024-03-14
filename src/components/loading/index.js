import React from 'react';

const LoadingWrapper = ({ isLoading, children }) => {
  return (
    <div>
      {isLoading ? 'Загрузка...' : children}
    </div>
  );
};

export default LoadingWrapper;