import { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Trash2, User, BookOpen } from 'lucide-react';
import styles from './Moderation.module.css';

const MOCK_REPORTS = [
    { id: 1, type: 'ARNAQUE', date: '08/03/2026', reporter: 'Alice Dubois', reported: 'Jean Dupont', subject: 'Livre non reçu après paiement', status: 'Pending', severity: 'High' },
    { id: 2, type: 'CONTENU_INAPPROPRIÉ', date: '07/03/2026', reporter: 'Bob Martin', reported: 'Luc Bernard', subject: 'Photos inappropriées sur l\'annonce #103', status: 'Resolved', severity: 'Medium' },
    { id: 3, type: 'AUTRE', date: '06/03/2026', reporter: 'Charlie Lefebvre', reported: 'Sophie Martin', subject: 'Langage agressif dans les messages', status: 'Pending', severity: 'Low' },
];

export default function Moderation() {
    const [reports, setReports] = useState(MOCK_REPORTS);
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'

    const resolveReport = (id) => {
        setReports(reports.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
    };

    const deleteReport = (id) => {
        setReports(reports.filter(r => r.id !== id));
    };

    const displayedReports = reports.filter(r =>
        activeTab === 'active' ? r.status === 'Pending' : r.status === 'Resolved'
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Modération & Plaintes</h1>
                    <p className={styles.subtitle}>Gérez les signalements et les conflits entre utilisateurs.</p>
                </div>
            </header>

            <div className={styles.tabsContainer}>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'active' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('active')}
                >
                    Plaintes en attente
                    <span className={styles.tabCount}>
                        {reports.filter(r => r.status === 'Pending').length}
                    </span>
                </button>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'history' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    Historique
                    <span className={styles.tabCount}>
                        {reports.filter(r => r.status === 'Resolved').length}
                    </span>
                </button>
            </div>

            <div className={styles.reportsList}>
                {displayedReports.map(report => (
                    <div key={report.id} className={`glass-panel ${styles.reportCard}`}>
                        <div className={styles.cardHeader}>
                            <div className={`${styles.severityIndicator} ${styles[report.severity.toLowerCase()]}`}>
                                {report.severity === 'High' ? <ShieldAlert size={20} /> : <AlertTriangle size={20} />}
                                <span>Priorité {report.severity}</span>
                            </div>
                            <span className={`${styles.statusBadge} ${report.status === 'Resolved' ? styles.statusResolved : styles.statusPending}`}>
                                {report.status === 'Resolved' ? 'Résolu' : 'En attente'}
                            </span>
                        </div>

                        <div className={styles.cardBody}>
                            <h3 className={styles.reportType}>{report.type.replace('_', ' ')}</h3>
                            <p className={styles.subject}>{report.subject}</p>

                            <div className={styles.detailsRow}>
                                <div className={styles.detailItem}>
                                    <User size={14} />
                                    <span>Signalé par : <b>{report.reporter}</b></span>
                                </div>
                                <div className={styles.detailItem}>
                                    <ShieldAlert size={14} />
                                    <span>Contre : <b>{report.reported}</b></span>
                                </div>
                                <div className={styles.detailItem}>
                                    <BookOpen size={14} />
                                    <span>Date : {report.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.cardFooter}>
                            {activeTab === 'active' ? (
                                <>
                                    <button className={styles.resolveBtn} onClick={() => resolveReport(report.id)}>
                                        <CheckCircle size={16} /> Marquer comme résolu
                                    </button>
                                    <button className={styles.banBtn}>
                                        <ShieldAlert size={16} /> Bloquer l'utilisateur
                                    </button>
                                </>
                            ) : (
                                <button className={styles.deleteBtn} onClick={() => deleteReport(report.id)}>
                                    <Trash2 size={16} /> Supprimer de l'historique
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
