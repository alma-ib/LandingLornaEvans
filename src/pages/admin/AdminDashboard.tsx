import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminCrudSection } from '../../components/AdminCrudSection/AdminCrudSection';
import { TABLE_LABELS, type TableName } from '../../types/content';
import './admin-shared.css';
import './AdminDashboard.css';

const TABS: TableName[] = ['courses', 'events', 'news'];

export const AdminDashboard: React.FC = () => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TableName>('courses');

  return (
    <div className="admin-page admin-dashboard">
      <header className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">ALMA-IB Admin</h1>
        <button className="admin-btn admin-btn-secondary" onClick={() => signOut()}>Cerrar sesión</button>
      </header>

      <nav className="admin-dashboard-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`admin-dashboard-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {TABLE_LABELS[tab]}
          </button>
        ))}
      </nav>

      <main className="admin-dashboard-content">
        <AdminCrudSection table={activeTab} label={TABLE_LABELS[activeTab]} />
      </main>
    </div>
  );
};
