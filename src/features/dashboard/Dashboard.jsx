import { Users, BookOpen, ShieldAlert, ArrowUpRight, TrendingUp } from 'lucide-react';
import styles from './Dashboard.module.css';

const STATS = [
    { label: 'Utilisateurs Actifs', value: '1,482', change: '+12%', icon: Users, color: 'var(--accent-color)' },
    { label: 'Annonces en ligne', value: '3,210', change: '+5%', icon: BookOpen, color: 'var(--success)' },
    { label: 'Plaintes / Modération', value: '24', change: '-2%', icon: ShieldAlert, color: 'var(--danger)' },
    { label: 'Échanges réalisés', value: '892', change: '+18%', icon: TrendingUp, color: 'var(--warning)' },
];

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Vue d'ensemble</h1>
                    <p className={styles.subtitle}>Statistiques clés de la plateforme BourseManuels</p>
                </div>
            </header>

            <div className={styles.statsGrid}>
                {STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    const isPositive = stat.change.startsWith('+');

                    return (
                        <div key={i} className={`glass-panel ${styles.statCard}`}>
                            <div className={styles.statHeader}>
                                <div
                                    className={styles.iconWrapper}
                                    style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                                >
                                    <Icon size={24} />
                                </div>
                                <div className={`${styles.changeBadge} ${isPositive ? styles.positive : styles.negative}`}>
                                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowUpRight size={14} style={{ transform: 'rotate(90deg)' }} />}
                                    {stat.change}
                                </div>
                            </div>
                            <div className={styles.statBody}>
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.chartsGrid}>
                <div className={`glass-panel ${styles.chartCard}`}>
                    <div className={styles.chartHeader}>
                        <h3>Activité Récente</h3>
                        <button className={styles.filterBtn}>Ce mois</button>
                    </div>
                    <div className={styles.placeholderChart}>
                        {/* Visual placeholder for a real chart library like Recharts */}
                        <div className={styles.bar} style={{ height: '40%' }}></div>
                        <div className={styles.bar} style={{ height: '60%' }}></div>
                        <div className={styles.bar} style={{ height: '30%' }}></div>
                        <div className={styles.bar} style={{ height: '80%' }}></div>
                        <div className={styles.bar} style={{ height: '50%' }}></div>
                        <div className={styles.bar} style={{ height: '90%' }}></div>
                        <div className={styles.bar} style={{ height: '70%' }}></div>
                    </div>
                </div>

                <div className={`glass-panel ${styles.chartCard}`}>
                    <div className={styles.chartHeader}>
                        <h3>Dernières Annonces</h3>
                        <button className={styles.filterBtn}>Voir tout</button>
                    </div>
                    <ul className={styles.listArea}>
                        {[1, 2, 3, 4].map(i => (
                            <li key={i} className={styles.listItem}>
                                <div className={styles.itemIcon}>
                                    <BookOpen size={18} />
                                </div>
                                <div className={styles.itemInfo}>
                                    <h4>Algèbre Linéaire - 2ème Édition</h4>
                                    <p>Vendue par Jean Dupont</p>
                                </div>
                                <span className={styles.statusBadge}>En attente</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
