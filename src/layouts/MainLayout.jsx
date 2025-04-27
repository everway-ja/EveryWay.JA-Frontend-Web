import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
