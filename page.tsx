'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useWorkbench } from '@/context/WorkbenchContext';
import { LoginPage } from '@/components/auth/LoginPage';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MainDashboard } from '@/components/dashboard/MainDashboard';
import { AIWorkspace } from '@/components/workspace/AIWorkspace';
import { AgentCenter } from '@/components/agents/AgentCenter';
import { KnowledgeCenter } from '@/components/knowledge/KnowledgeCenter';
import { ModelHub } from '@/components/models/ModelHub';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { ReportGenerator } from '@/components/reports/ReportGenerator';
import { SecurityCenter } from '@/components/security/SecurityCenter';
import { PolicyCenter } from '@/components/policies/PolicyCenter';
import { AuditCenter } from '@/components/audit/AuditCenter';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { activeTab } = useWorkbench();

  // If user is not signed in, show the cinematic landing / login page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Render the sovereign workbench
  return (
    <div className="min-h-screen bg-[#0b0e14] flex text-slate-100 antialiased font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <Header />

        {/* Dynamic Main Body Content based on Active Tab */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {activeTab === 'dashboard' && <MainDashboard />}
          {activeTab === 'workspace' && <AIWorkspace />}
          {activeTab === 'agents' && <AgentCenter />}
          {activeTab === 'knowledge' && <KnowledgeCenter />}
          {activeTab === 'models' && <ModelHub />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'reports' && <ReportGenerator />}
          {activeTab === 'security' && <SecurityCenter />}
          {activeTab === 'policies' && <PolicyCenter />}
          {activeTab === 'audit' && <AuditCenter />}
        </main>
      </div>
    </div>
  );
}
