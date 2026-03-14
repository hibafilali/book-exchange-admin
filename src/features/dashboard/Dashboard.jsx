import { useState } from 'react';
import { Users, BookOpen, ShieldAlert, ArrowUpRight, TrendingUp, Calendar, Inbox } from 'lucide-react';
import styles from './Dashboard.module.css';

const STATS = [
    { label: 'Utilisateurs Actifs', value: '1,482', change: '+12%', icon: Users, color: 'var(--accent-color)' },
    { label: 'Annonces en ligne', value: '3,210', change: '+5%', icon: BookOpen, color: 'var(--success)' },
    { label: 'Signalements récents', value: '12', change: '-8%', icon: ShieldAlert, color: 'var(--danger)' },
    { label: 'Échanges réussis', value: '892', change: '+18%', icon: TrendingUp, color: 'var(--warning)' },
];

const CHART_DATA_7 = [
    { label: 'Lun', value: '45%' },
    { label: 'Mar', value: '65%' },
    { label: 'Mer', value: '35%' },
    { label: 'Jeu', value: '85%' },
    { label: 'Ven', value: '55%' },
    { label: 'Sam', value: '95%' },
    { label: 'Dim', value: '75%' },
];

const CHART_DATA_30 = [
    { label: 'Sem 1', value: '40%' },
    { label: 'Sem 2', value: '75%' },
    { label: 'Sem 3', value: '55%' },
    { label: 'Sem 4', value: '90%' },
];

export default function Dashboard() {
    const [chartRange, setChartRange] = useState('7');
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadReport = () => {
        setIsDownloading(true);
        // Simulation d'un téléchargement
        setTimeout(() => {
            setIsDownloading(false);
            alert("✅ Le rapport hebdomadaire a été généré et téléchargé avec succès !");
        }, 1500);
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Tableau de Bord</h1>
                    <p className={styles.subtitle}>Supervision globale de la plateforme BourseManuels</p>
                </div>
                <div className={styles.headerActions}>
                    <button
                        className={styles.exportBtn}
                        onClick={handleDownloadReport}
                        disabled={isDownloading}
                        style={{ opacity: isDownloading ? 0.7 : 1, cursor: isDownloading ? 'wait' : 'pointer' }}
                    >
                        <Calendar size={18} />
                        <span>{isDownloading ? 'Génération en cours...' : 'Rapport Hebdomadaire'}</span>
                    </button>
                </div>
            </header>

            <div className={styles.statsGrid}>
                {STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    const isPositive = stat.change.startsWith('+');

                    return (
                        <div key={i} className={`${styles.statCard}`}>
                            <div className={styles.statHeader}>
                                <div
                                    className={styles.iconWrapper}
                                    style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                                >
                                    <Icon size={26} />
                                </div>
                                <div className={`${styles.changeBadge} ${isPositive ? styles.positive : styles.negative}`}>
                                    {stat.change}
                                </div>
                            </div>
                            <div className={styles.statBody}>
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </div>
                            <div className={styles.statFooter}>
                                <ArrowUpRight size={14} className={isPositive ? styles.up : styles.down} />
                                <span>vs le mois dernier</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.chartsGrid}>
                <div className={`glass-panel ${styles.chartCard}`}>
                    <div className={styles.chartHeader}>
                        <div className={styles.titleWithIcon}>
                            <TrendingUp size={20} color="var(--accent-color)" />
                            <h3>Trafic & Inscriptions</h3>
                        </div>
                        <div className={styles.chartActions}>
                            <button
                                className={`${styles.chartTab} ${chartRange === '7' ? styles.activeTab : ''}`}
                                onClick={() => setChartRange('7')}
                            >
                                7 Jours
                            </button>
                            <button
                                className={`${styles.chartTab} ${chartRange === '30' ? styles.activeTab : ''}`}
                                onClick={() => setChartRange('30')}
                            >
                                30 Jours
                            </button>
                        </div>
                    </div>
                    <div className={styles.placeholderChart}>
                        {(chartRange === '7' ? CHART_DATA_7 : CHART_DATA_30).map((data, index) => (
                            <div key={index} className={styles.chartCol}>
                                <div className={styles.barFill} style={{ height: data.value }}></div>
                                <span className={styles.dayLabel}>{data.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`glass-panel ${styles.chartCard}`}>
                    <div className={styles.chartHeader}>
                        <div className={styles.titleWithIcon}>
                            <Inbox size={20} color="var(--warning)" />
                            <h3>Activités Récentes</h3>
                        </div>
                        <button className={styles.viewMoreBtn}>Voir tout</button>
                    </div>
                    <ul className={styles.listArea}>
                        <li className={styles.listItem}>
                            <div className={styles.itemIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                <Users size={16} />
                            </div>
                            <div className={styles.itemInfo}>
                                <h4>Nouvel Utilisateur</h4>
                                <p>Alice Dubois vient de s'inscrire</p>
                            </div>
                            <span className={styles.timeLabel}>2m</span>
                        </li>
                        <li className={styles.listItem}>
                            <div className={styles.itemIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                <BookOpen size={16} />
                            </div>
                            <div className={styles.itemInfo}>
                                <h4>Annonce Validée</h4>
                                <p>Physique Quantique par Luc B.</p>
                            </div>
                            <span className={styles.timeLabel}>15m</span>
                        </li>
                        <li className={styles.listItem}>
                            <div className={styles.itemIcon} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                                <ShieldAlert size={16} />
                            </div>
                            <div className={styles.itemInfo}>
                                <h4>Plainte reçue</h4>
                                <p>Signalement contre Jean D.</p>
                            </div>
                            <span className={styles.timeLabel}>1h</span>
                        </li>
                        <li className={styles.listItem}>
                            <div className={styles.itemIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                                <TrendingUp size={16} />
                            </div>
                            <div className={styles.itemInfo}>
                                <h4>Échange finalisé</h4>
                                <p>Transaction #892 complétée</p>
                            </div>
                            <span className={styles.timeLabel}>3h</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
