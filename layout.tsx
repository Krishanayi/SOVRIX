import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { WorkbenchProvider } from '@/context/WorkbenchContext';
import { CommandPalette } from '@/components/layout/CommandPalette';

export const metadata: Metadata = {
  title: 'SOVEREIGN AI WORKBENCH | Private Intelligence. Industrial Action. Complete Control.',
  description: 'Enterprise-grade sovereign on-premise AI operating environment for confidential industrial operations, permission-aware RAG, multimodal machine diagnostics, and human-in-the-loop workflows.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#0b0e14] text-slate-100">
      <body className="min-h-screen bg-[#0b0e14] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <ToastProvider>
          <AuthProvider>
            <WorkbenchProvider>
              <CommandPalette />
              {children}
            </WorkbenchProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
