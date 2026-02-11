import React from 'react';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    return (
        <div className="bento-grid">
            {children}
        </div>
    );
};

export default MainLayout;
