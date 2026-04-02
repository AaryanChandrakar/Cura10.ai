'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar/Sidebar';
import { getDiagnosisHistory, deleteDiagnosis, downloadDiagnosisPdf } from '@/lib/api';
import styles from './page.module.css';

interface DiagnosisSummary {
    id: string;
    report_id: string;
    patient_name: string;
    selected_specialists: string[];
    chief_complaint: string;
    status: string;
    created_at: string;
}

/* Map specialist names to emoji icons */
const SPECIALIST_ICONS: Record<string, string> = {
    Cardiologist: '❤️',
    Psychologist: '🧠',
    Pulmonologist: '🫁',
    Neurologist: '🧬',
    Endocrinologist: '⚗️',
    Oncologist: '🔬',
    Dermatologist: '🩺',
    Gastroenterologist: '🏥',
    Orthopedist: '🦴',
    'General Practitioner': '👨‍⚕️',
};

export default function HistoryPage() {
    const { loading, isAuthenticated } = useAuth();
    const router = useRouter();

    const [diagnoses, setDiagnoses] = useState<DiagnosisSummary[]>([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !isAuthenticated) router.push('/');
    }, [loading, isAuthenticated, router]);

    useEffect(() => {
        if (isAuthenticated) {
            getDiagnosisHistory()
                .then((res) => {
                    setDiagnoses(res.diagnoses || []);
                    setPageLoading(false);
                })
                .catch(() => setPageLoading(false));
        }
    }, [isAuthenticated]);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Delete this diagnosis and its chat history?')) return;
        setDeletingId(id);
        try {
            await deleteDiagnosis(id);
            setDiagnoses((prev) => prev.filter((d) => d.id !== id));
        } catch {
            /* ignore */
        } finally {
            setDeletingId(null);
        }
    };

    const handleDownloadPdf = async (d: DiagnosisSummary, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await downloadDiagnosisPdf(d.id, d.patient_name);
        } catch {
            /* ignore */
        }
    };

    const filtered = diagnoses.filter((d) => {
        const term = searchTerm.toLowerCase();
        return (
            d.patient_name.toLowerCase().includes(term) ||
            d.selected_specialists.some((s) => s.toLowerCase().includes(term)) ||
            (d.chief_complaint || '').toLowerCase().includes(term)
        );
    });

    if (loading || !isAuthenticated) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div className="spinner spinner-lg" />
            </div>
        );
    }

    return (
        <div className="page-layout">
            <Sidebar />
            <main className="page-content">
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h1 className="page-title">Diagnosis History</h1>
                        <p className="page-subtitle">
                            View and manage your past diagnoses.
                            {!pageLoading && diagnoses.length > 0 && (
                                <span className={styles.countBadge}>{diagnoses.length} record{diagnoses.length !== 1 ? 's' : ''}</span>
                            )}
                        </p>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => router.push('/analyze')}
                    >
                        🔬 New Diagnosis
                    </button>
                </div>

                {/* Search */}
                <div className={styles.searchBar}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search by patient name, specialist, or condition..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            className={styles.searchClear}
                            onClick={() => setSearchTerm('')}
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Table */}
                {pageLoading ? (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Patient</th>
                                    <th>Condition / Chief Complaint</th>
                                    <th>Specialists</th>
                                    <th>Date &amp; Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i}>
                                        <td><div className="skeleton" style={{ height: 16, width: 20 }} /></td>
                                        <td><div className="skeleton" style={{ height: 16, width: 120 }} /></td>
                                        <td><div className="skeleton" style={{ height: 16, width: 200 }} /></td>
                                        <td><div className="skeleton" style={{ height: 24, width: 180 }} /></td>
                                        <td><div className="skeleton" style={{ height: 16, width: 130 }} /></td>
                                        <td><div className="skeleton" style={{ height: 24, width: 80 }} /></td>
                                        <td><div className="skeleton" style={{ height: 28, width: 120 }} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : filtered.length > 0 ? (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Patient</th>
                                    <th>Condition / Chief Complaint</th>
                                    <th>Specialists</th>
                                    <th>Date &amp; Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((d, i) => (
                                    <tr
                                        key={d.id}
                                        className={styles.row}
                                        style={{ animationDelay: `${i * 0.04}s` }}
                                        onClick={() => router.push(`/diagnosis/${d.id}`)}
                                    >
                                        <td className={styles.rowNum}>{i + 1}</td>
                                        <td>
                                            <div className={styles.patientCell}>
                                                <span className={styles.patientAvatar}>
                                                    {d.patient_name.charAt(0).toUpperCase()}
                                                </span>
                                                <span className={styles.patientName}>{d.patient_name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.condition} title={d.chief_complaint || 'N/A'}>
                                                {d.chief_complaint || '—'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.specialistChips}>
                                                {d.selected_specialists.map((s) => (
                                                    <span key={s} className={styles.specialistTag}>
                                                        <span className={styles.specialistEmoji}>{SPECIALIST_ICONS[s] || '👨‍⚕️'}</span>
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.dateCell}>
                                                <span className={styles.dateMain}>
                                                    {new Date(d.created_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                                <span className={styles.dateTime}>
                                                    {new Date(d.created_at).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${d.status === 'completed' ? styles.statusCompleted : styles.statusPending}`}>
                                                <span className={styles.statusDot} />
                                                {d.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    className={styles.actionBtn}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/diagnosis/${d.id}`);
                                                    }}
                                                    title="View Diagnosis"
                                                >
                                                    👁️
                                                </button>
                                                <button
                                                    className={`${styles.actionBtn} ${styles.chatBtn}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/chat?diagnosis=${d.id}`);
                                                    }}
                                                    title="Chat about this diagnosis"
                                                >
                                                    💬
                                                </button>
                                                <button
                                                    className={styles.actionBtn}
                                                    onClick={(e) => handleDownloadPdf(d, e)}
                                                    title="Download PDF"
                                                >
                                                    📥
                                                </button>
                                                <button
                                                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                                    onClick={(e) => handleDelete(d.id, e)}
                                                    title="Delete"
                                                    disabled={deletingId === d.id}
                                                >
                                                    {deletingId === d.id ? '⏳' : '🗑️'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📋</div>
                        <h3 className={styles.emptyTitle}>
                            {searchTerm ? 'No matching diagnoses' : 'No diagnoses yet'}
                        </h3>
                        <p className={styles.emptyDesc}>
                            {searchTerm
                                ? `No results found for "${searchTerm}". Try a different search term.`
                                : 'Start by running your first AI-powered diagnosis on a medical report.'}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => router.push('/analyze')}
                                className="btn btn-primary btn-lg"
                                style={{ marginTop: 16 }}
                            >
                                🔬 Run Your First Diagnosis →
                            </button>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
