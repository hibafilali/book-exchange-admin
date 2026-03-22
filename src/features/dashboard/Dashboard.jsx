import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, FileText, Activity, CheckCircle, XCircle, 
    Shield, Lock, Unlock, AlertTriangle, MessageSquare, Search
} from 'lucide-react';
import { useAuth } from '../auth/useAuth';
import styles from './Dashboard.module.css';

// ============================
// MOCK DATA
// ============================
const MOCK_STATS = {
    totalUsers: 1250,
    pendingAds: 14,
    successTransactions: 340,
};

const INITIAL_PENDING_ADS = [
    { id: 101, titre: 'Algorithmes Orientés Objet', etudiant: 'Karim F.', type: 'Vente', prix: '120 DH', date: 'Il y a 2h' },
    { id: 102, titre: 'Anatomie - Tome 2', etudiant: 'Sofia M.', type: 'Don', prix: '-', date: 'Il y a 5h' },
    { id: 103, titre: 'Mécanique Quantique', etudiant: 'Ayoub H.', type: 'Vente', prix: '200 DH', date: 'Il y a 1j' },
    { id: 104, titre: 'Droit des Affaires', etudiant: 'Leila K.', type: 'Prêt', prix: 'Caution', date: 'Il y a 1j' },
    { id: 105, titre: 'Economie Monétaire', etudiant: 'Youssef B.', type: 'Vente', prix: '80 DH', date: 'Il y a 2j' },
];

const MOCK_USERS = [
    { id: 1, nom: 'Karim F.', email: 'karim@etu.com', actif: true },
    { id: 2, nom: 'Nassim J.', email: 'nassim@etu.com', actif: false },
    { id: 3, nom: 'Sofia M.', email: 'sofia@etu.com', actif: true },
    { id: 4, nom: 'Ali R.', email: 'ali@etu.com', actif: true },
];

const INITIAL_AUDIT = [
    { id: 1, action: 'Annonce "Biologie Moléculaire" validée', admin: 'SuperAdmin', time: '10:45' },
    { id: 2, action: 'Utilisateur "Nassim J." bloqué (Spam)', admin: 'Modérateur', time: '09:30' },
    { id: 3, action: 'Annonce "Calculus" refusée (Photos floues)', admin: 'SuperAdmin', time: 'Hier' },
];

export default function Dashboard() {
    const { user } = useAuth();
    
    // States
    const [pendingAds, setPendingAds] = useState(INITIAL_PENDING_ADS);
    const [usersList, setUsersList] = useState(MOCK_USERS);
    const [auditLog, setAuditLog] = useState(INITIAL_AUDIT);
    
    // Modal State
    const [rejectModalId, setRejectModalId] = useState(null);
    const [rejectReason, setRejectReason] = useState('');

    // --- Actions ---
    const handleValidateAd = (ad) => {
        setPendingAds(prev => prev.filter(a => a.id !== ad.id));
        setAuditLog(prev => [{ id: Date.now(), action: `Annonce "${ad.titre}" validée`, admin: user?.name || 'Admin', time: 'À l\'instant' }, ...prev]);
    };

    const handleRejectSubmit = () => {
        if (!rejectReason.trim()) return;
        const ad = pendingAds.find(a => a.id === rejectModalId);
        setPendingAds(prev => prev.filter(a => a.id !== rejectModalId));
        setAuditLog(prev => [{ id: Date.now(), action: `Annonce "${ad.titre}" refusée (${rejectReason})`, admin: user?.name || 'Admin', time: 'À l\'instant' }, ...prev]);
        setRejectModalId(null);
        setRejectReason('');
    };

    const toggleUserStatus = (userId) => {
        setUsersList(prev => prev.map(u => {
            if (u.id === userId) {
                const newStatus = !u.actif;
                setAuditLog(log => [{ id: Date.now(), action: `Utilisateur "${u.nom}" ${newStatus ? 'débloqué' : 'bloqué'}`, admin: user?.name || 'Admin', time: 'À l\'instant' }, ...log]);
                return { ...u, actif: newStatus };
            }
            return u;
        }));
    };

    // Protect against non-ADMIN (Though routed via PrivateRoute usually)
    if (user?.role && user.role !== 'ADMIN') {
        return (
            <div className={styles.notAuthorized}>
                <Shield size={64} color="#ef4444" />
                <h1>Accès Refusé</h1>
                <p>Votre compte ne possède pas les privilèges de Modérateur ou Administrateur.</p>
            </div>
        );
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } }
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Control Center</h1>
                    <p className={styles.subtitle}>Supervision globale & File d'attente de modération</p>
                </div>
            </div>

            <motion.div 
                className={styles.bentoGrid}
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
                {/* ====== STATS CARDS ====== */}
                <motion.div className={styles.statCard} variants={itemVariants}>
                    <div className={styles.statLine}>
                        <div>
                            <p className={styles.statLabel}>Total Utilisateurs</p>
                            <h3 className={styles.statValue}>{MOCK_STATS.totalUsers}</h3>
                        </div>
                        <div className={styles.statIconWrap} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <Users size={24} />
                        </div>
                    </div>
                    <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '85%', background: '#3b82f6' }}></div></div>
                </motion.div>

                <motion.div className={styles.statCard} variants={itemVariants}>
                    <div className={styles.statLine}>
                        <div>
                            <p className={styles.statLabel}>En Attente de Modération</p>
                            <h3 className={styles.statValue}>{pendingAds.length}</h3>
                        </div>
                        <div className={styles.statIconWrap} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                            <AlertTriangle size={24} />
                        </div>
                    </div>
                    <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: `${(pendingAds.length / 50) * 100}%`, background: '#f59e0b' }}></div></div>
                </motion.div>

                <motion.div className={styles.statCard} variants={itemVariants}>
                    <div className={styles.statLine}>
                        <div>
                            <p className={styles.statLabel}>Transactions Réussies</p>
                            <h3 className={styles.statValue}>{MOCK_STATS.successTransactions}</h3>
                        </div>
                        <div className={styles.statIconWrap} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                            <Activity size={24} />
                        </div>
                    </div>
                    <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '70%', background: '#10b981' }}></div></div>
                </motion.div>

                {/* ====== MODERATION QUEUE (Span 2) ====== */}
                <motion.div className={`${styles.bentoCard} ${styles.span2}`} variants={itemVariants}>
                    <div className={styles.cardHeader}>
                        <h2>File d'Attente de Modération</h2>
                        <span className={styles.badgeList}>{pendingAds.length} à traiter</span>
                    </div>
                    <div className={styles.tableWrap}>
                        <table className={styles.adminTable}>
                            <thead>
                                <tr>
                                    <th>Annonce</th>
                                    <th>Étudiant</th>
                                    <th>Détails</th>
                                    <th className={styles.textRight}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {pendingAds.map(ad => (
                                        <motion.tr 
                                            key={ad.id}
                                            initial={{ opacity: 0, x: -20 }} 
                                            animate={{ opacity: 1, x: 0 }} 
                                            exit={{ opacity: 0, scale: 0.95, background: 'rgba(16,185,129,0.1)' }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <td><strong>{ad.titre}</strong></td>
                                            <td>{ad.etudiant}</td>
                                            <td><span className={styles.typeBadge}>{ad.type}</span> • {ad.prix}</td>
                                            <td className={styles.actionsCell}>
                                                <button className={styles.btnValidate} onClick={() => handleValidateAd(ad)} title="Valider">
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button className={styles.btnReject} onClick={() => setRejectModalId(ad.id)} title="Refuser">
                                                    <XCircle size={18} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                    {pendingAds.length === 0 && (
                                        <tr><td colSpan="4" className={styles.emptyState}>Aucune annonce en attente. Beau travail ! 🎉</td></tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* ====== AUDIT LOG (Span 1) ====== */}
                <motion.div className={styles.bentoCard} variants={itemVariants}>
                    <div className={styles.cardHeader}>
                        <h2>Historique d'Audit</h2>
                    </div>
                    <div className={styles.auditList}>
                        <AnimatePresence>
                            {auditLog.map(log => (
                                <motion.div key={log.id} className={styles.auditRow} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} layout>
                                    <div className={styles.auditIcon}><Shield size={14} /></div>
                                    <div className={styles.auditContent}>
                                        <p>{log.action}</p>
                                        <span>{log.admin} • {log.time}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* ====== USER MANAGEMENT ====== */}
                <motion.div className={styles.bentoCard} variants={itemVariants} style={{ gridColumn: '1 / -1' }}>
                    <div className={styles.cardHeader}>
                        <h2>Gestion Rapide des Utilisateurs</h2>
                        <div className={styles.searchWrap}>
                            <Search size={16} /> <input type="text" placeholder="Rechercher..." className={styles.searchInput} />
                        </div>
                    </div>
                    <div className={styles.usersGrid}>
                        {usersList.map(u => (
                            <div key={u.id} className={`${styles.userCard} ${!u.actif ? styles.userBlocked : ''}`}>
                                <div className={styles.userInfo}>
                                    <div className={styles.userAvatar}>{u.nom[0]}</div>
                                    <div>
                                        <strong>{u.nom}</strong>
                                        <span>{u.email}</span>
                                    </div>
                                </div>
                                <button 
                                    className={`${styles.toggleBtn} ${u.actif ? styles.btnActive : styles.btnInactive}`}
                                    onClick={() => toggleUserStatus(u.id)}
                                >
                                    {u.actif ? <><Unlock size={14} /> Actif</> : <><Lock size={14} /> Bloqué</>}
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* ====== REJECT MODAL ====== */}
            <AnimatePresence>
                {rejectModalId && (
                    <div className={styles.modalOverlay}>
                        <motion.div 
                            className={styles.modalContent}
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <div className={styles.modalHeader}>
                                <h2><MessageSquare size={20} /> Motif du refus</h2>
                                <button className={styles.closeBtn} onClick={() => setRejectModalId(null)}><XCircle size={20} /></button>
                            </div>
                            <div className={styles.modalBody}>
                                <p>Expliquez brièvement pourquoi cette annonce est refusée. Ce motif sera enregistré dans le <strong>LogModeration</strong> et envoyé à l'étudiant.</p>
                                <textarea 
                                    className={styles.rejectTextarea} 
                                    rows="4" 
                                    placeholder="Ex: Photos trop floues, contenu inapproprié, prix non conforme..."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className={styles.modalFooter}>
                                <button className={styles.btnCancel} onClick={() => setRejectModalId(null)}>Annuler</button>
                                <button className={styles.btnConfirmReject} onClick={handleRejectSubmit} disabled={!rejectReason.trim()}>
                                    Confirmer le Refus
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
