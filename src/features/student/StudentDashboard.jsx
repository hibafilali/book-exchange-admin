import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, Leaf, BookHeart, Plus, Edit2, Trash2, CheckCircle,
    Clock, XCircle, Bell, MessageSquare, ExternalLink, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../auth/useAuth';
import styles from './StudentDashboard.module.css';

// ============================
// MOCK DATA (5 Tables)
// ============================
const MOCK_STATS = {
    economies: 450, // DH sauvés (Operations PRET/DON)
    gains: 120, // DH gagnés (Operations VENTE)
    livresPartages: 4, // Annonces publiées
    arbresSauves: 2.5 // Impact Eco (estimé)
};

const MOCK_LISTINGS = [
    { id: 1, titre: 'Algorithmes et Structures...', type: 'VENTE', prix: '150 DH', status: 'VALIDEE', vues: 45 },
    { id: 2, titre: 'Introduction au Droit', type: 'DON', prix: 'Gratuit', status: 'ATTENTE', vues: 0 },
    { id: 3, titre: 'Physique Quantique', type: 'PRET', prix: '2 sem', status: 'EXPIREE', vues: 12 },
];

const MOCK_OPERATIONS = [
    { id: 101, livre: 'Macroéconomie Approfondie', avec: 'Sofia M.', type: 'ACHAT', date: '21 Mar 2026', montant: '- 80 DH' },
    { id: 102, livre: 'Comptabilité Générale', avec: 'Omar B.', type: 'VENTE', date: '15 Mar 2026', montant: '+ 120 DH' },
    { id: 103, livre: 'Anatomie Humaine', avec: 'Leïla K.', type: 'EMPRUNT', date: '10 Mar 2026', montant: 'Gratuit' },
];

const MOCK_MESSAGES = [
    { id: 1, expediteur: 'Amine T.', sujet: 'Intéressé par Algorithmes', temps: 'Il y a 2h', isNew: true },
    { id: 2, expediteur: 'Sarah H.', sujet: 'Lieu de rdv pour le Droit', temps: 'Il y a 1j', isNew: false },
];

const MOCK_NOTIFS = [
    { id: 1, type: 'success', texte: 'Votre annonce "Introduction au Droit" a été validée.', temps: 'Il y a 3h' },
    { id: 2, type: 'warning', texte: 'L\'annonce "Physique Quantique" arrive à expiration.', temps: 'Il y a 2j' },
];

const MOCK_WISHES = [
    { id: 1, titre: 'Marketing Digital', auteur: 'D. Chaffey' },
    { id: 2, titre: 'Bases de Données', auteur: 'G. Gardarin' },
];

// Status badge mapping
const STATUS_STYLES = {
    VALIDEE: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', icon: CheckCircle, label: 'En ligne' },
    ATTENTE: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', icon: Clock, label: 'En revue' },
    EXPIREE: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', icon: XCircle, label: 'Expirée' },
};

// ============================
// MAIN COMPONENT
// ============================
export default function StudentDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Framer Motion staggered variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };
    
    // The 'Pop' effect requested for the Bento items
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <div className={styles.page}>
            <div className={styles.meshBg}></div> {/* Dynamic Mesh Gradient Background */}

            <div className={styles.container}>
                <motion.div
                    className={styles.bentoGrid}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {/* ——— WELCOME BANNER (Span Full) ——— */}
                    <motion.div className={`${styles.bentoCard} ${styles.welcomeCard}`} variants={itemVariants}>
                        <div className={styles.welcomeText}>
                            <h1>Salut {user?.name?.split(' ')[0] || 'Étudiant'} !</h1>
                            <p>Prêt pour ton prochain échange ? Voici ton résumé d'activité.</p>
                        </div>
                        <button className={styles.btnPrimary} onClick={() => navigate('/student-dashboard/publish')}>
                            <Plus size={18} /> Publier un manuel
                        </button>
                    </motion.div>

                    {/* ——— STATS D'IMPACT (3 Cards) ——— */}
                    <motion.div className={styles.statCard} variants={itemVariants}>
                        <div className={styles.statIcon} style={{ color: '#F97316', background: 'rgba(249,115,22,0.15)' }}>
                            <TrendingUp size={24} />
                        </div>
                        <div className={styles.statInfo}>
                            <h3>Argent Économisé</h3>
                            <p><strong>{MOCK_STATS.economies}</strong> DH</p>
                            <span className={styles.statSub}>+ {MOCK_STATS.gains} DH gagnés</span>
                        </div>
                    </motion.div>

                    <motion.div className={styles.statCard} variants={itemVariants}>
                        <div className={styles.statIcon} style={{ color: '#06B6D4', background: 'rgba(6,182,212,0.15)' }}>
                            <BookHeart size={24} />
                        </div>
                        <div className={styles.statInfo}>
                            <h3>Manuels Partagés</h3>
                            <p><strong>{MOCK_STATS.livresPartages}</strong> livres</p>
                            <span className={styles.statSub}>Sur la plateforme</span>
                        </div>
                    </motion.div>

                    <motion.div className={styles.statCard} variants={itemVariants} style={{ position: 'relative', overflow: 'hidden' }}>
                        <div className={styles.statIcon} style={{ color: '#10B981', background: 'rgba(16,185,129,0.15)' }}>
                            <Leaf size={24} />
                        </div>
                        <div className={styles.statInfo}>
                            <h3>Impact Écologique</h3>
                            <p><strong>{MOCK_STATS.arbresSauves}</strong> arbres</p>
                            <span className={styles.statSub}>D'empreinte carbone évitée</span>
                        </div>
                        <div className={styles.ecoGlow}></div>
                    </motion.div>

                    {/* ——— MAIN LISTINGS (Span 2 Cols) ——— */}
                    <motion.div className={`${styles.bentoCard} ${styles.span2}`} variants={itemVariants}>
                        <div className={styles.cardHeader}>
                            <h2>Mes Annonces</h2>
                            <button className={styles.linkBtn}>Tout voir</button>
                        </div>
                        <div className={styles.listingsList}>
                            {MOCK_LISTINGS.map(l => {
                                const StatusIcon = STATUS_STYLES[l.status].icon;
                                return (
                                    <div key={l.id} className={styles.listingRow}>
                                        <div className={styles.listLeft}>
                                            <strong>{l.titre}</strong>
                                            <span>{l.type} • {l.prix} • {l.vues} vues</span>
                                        </div>
                                        <div className={styles.listRight}>
                                            <span className={styles.statusBadge} style={{ background: STATUS_STYLES[l.status].bg, color: STATUS_STYLES[l.status].color }}>
                                                <StatusIcon size={14} /> {STATUS_STYLES[l.status].label}
                                            </span>
                                            <div className={styles.listActions}>
                                                <button title="Modifier"><Edit2 size={16} /></button>
                                                <button title="Supprimer" className={styles.deleteBtn}><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* ——— MESSAGES (Span 1 Col) ——— */}
                    <motion.div className={styles.bentoCard} variants={itemVariants}>
                        <div className={styles.cardHeader}>
                            <h2><MessageSquare size={18} /> Messages</h2>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span className={styles.notifBadge}>2</span>
                                <button className={styles.linkBtn} onClick={() => navigate('/student-dashboard/messages')}>Ouvrir</button>
                            </div>
                        </div>
                        <div className={styles.msgList}>
                            {MOCK_MESSAGES.map(m => (
                                <div key={m.id} className={`${styles.msgRow} ${m.isNew ? styles.msgNew : ''}`}>
                                    <div className={styles.msgAvatar}>{m.expediteur[0]}</div>
                                    <div className={styles.msgBody}>
                                        <div className={styles.msgHead}>
                                            <strong>{m.expediteur}</strong>
                                            <span>{m.temps}</span>
                                        </div>
                                        <p>{m.sujet}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ——— HISTORY LOG (Span 2 Cols) ——— */}
                    <motion.div className={`${styles.bentoCard} ${styles.span2}`} variants={itemVariants}>
                        <div className={styles.cardHeader}>
                            <h2>Historique des Échanges</h2>
                        </div>
                        <div className={styles.tableWrap}>
                            <table className={styles.historyTable}>
                                <thead>
                                    <tr>
                                        <th>Livre</th>
                                        <th>Avec</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                        <th className={styles.textRight}>Montant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_OPERATIONS.map(op => (
                                        <tr key={op.id}>
                                            <td><strong>{op.livre}</strong></td>
                                            <td>{op.avec}</td>
                                            <td><span className={styles.opType}>{op.type}</span></td>
                                            <td className={styles.mutedText}>{op.date}</td>
                                            <td className={`${styles.textRight} ${op.montant.startsWith('-') ? styles.textRed : styles.textGreen}`}>
                                                {op.montant}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* ——— NOTIFICATIONS & FAVS (Stacked 1 Col) ——— */}
                    <motion.div className={styles.stackedCards} variants={itemVariants}>
                        <div className={styles.bentoCard}>
                            <div className={styles.cardHeader}>
                                <h2><Bell size={18} /> Notifications</h2>
                            </div>
                            <div className={styles.notifList}>
                                {MOCK_NOTIFS.map(n => (
                                    <div key={n.id} className={styles.notifRow}>
                                        <div className={`${styles.notifDot} ${styles[n.type]}`}></div>
                                        <div className={styles.notifBody}>
                                            <p>{n.texte}</p>
                                            <span>{n.temps}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.bentoCard}>
                            <div className={styles.cardHeader}>
                                <h2>Mes Favoris</h2>
                                <button className={styles.linkBtn}>Voir +</button>
                            </div>
                            <div className={styles.favList}>
                                {MOCK_WISHES.map(w => (
                                    <div key={w.id} className={styles.favRow}>
                                        <div className={styles.favInfo}>
                                            <strong>{w.titre}</strong>
                                            <span>{w.auteur}</span>
                                        </div>
                                        <button className={styles.favAction}><ExternalLink size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}
