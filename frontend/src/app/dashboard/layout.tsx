import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard — Cura10.ai',
    description: 'Your AI medical diagnostics dashboard',
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
