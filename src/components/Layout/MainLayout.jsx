import React from 'react';
import './MainLayout.css';

const MainLayout = ({ leftColumn, centerColumn, rightColumn }) => {
    return (
        <div className="main-layout">
            <aside className="column left-column">
                {leftColumn}
            </aside>
            <main className="column center-column">
                {centerColumn}
            </main>
            <aside className="column right-column">
                {rightColumn}
            </aside>
        </div>
    );
};

export default MainLayout;
