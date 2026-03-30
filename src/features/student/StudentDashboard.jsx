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
    economies: 450, // DH sauvés 
    gains: 120, // DH gagnés 
    livresPartages: 4, 
    arbresSauves: 2.5 
};

// --- IMAGES POUR LE RENDU VISUEL ---
const IMG_ALGO = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
const IMG_DROIT = "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop";
const IMG_PHYSIQUE = "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop";

const MOCK_LISTINGS = [
    { id: 1, titre: 'Algorithmes et Structures...', type: 'VENTE', prix: '150 DH', status: 'VALIDEE', vues: 45, image: IMG_ALGO },
    { id: 2, titre: 'Introduction au Droit', type: 'DON', prix: 'Gratuit', status: 'ATTENTE', vues: 0, image: IMG_DROIT },
    { id: 3, titre: 'Physique Quantique', type: 'PRET', prix: '2 sem', status: 'EXPIREE', vues: 12, image: IMG_PHYSIQUE },
];

const MOCK_ACTIONS_REQUISES = [
    { id: 101, type: 'DEMANDE_PRET', livre: 'Algorithmes', avec: 'Sofia M.', avatar: 'S', temps: 'Il y a 30 min' },
    { id: 102, type: 'CONFIRM_REMISE', livre: 'Macroéconomie', avec: 'Omar B.', avatar: 'O', temps: 'Il y a 2h' },
];

const MOCK_WISHES_RADAR = [
    { id: 1, titre: 'Marketing Digital', auteur: 'D. Chaffey', match: true, edition: '2023' },
    { id: 2, titre: 'Bases de Données', auteur: 'G. Gardarin', match: false, edition: 'Peu importe' },
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
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                    
                    {/* ——— HEADER HEADER & ACTIONS PRIMAIRES ——— */}
                    <motion.div className={styles.dashboardHeader} variants={itemVariants}>
                        <div className={styles.welcomeText}>
                            <h1>C'est parti, {user?.name?.split(' ')[0] || 'Étudiant'} ! 🚀</h1>
                            <p>Voici votre centre de contrôle personnel. Gérez vos annonces et répondez aux demandes.</p>
                        </div>
                        <div className={styles.headerActions}>
                            <button className={styles.btnSecondary} onClick={() => navigate('/student-dashboard/search')}>
                                <BookHeart size={18} /> Renouveler Bibliothèque
                            </button>
                            <button className={styles.btnPrimary} onClick={() => navigate('/student-dashboard/publish')}>
                                <Plus size={18} /> Créer une annonce
                            </button>
                        </div>
                    </motion.div>

                    {/* ——— TOP BAR : IMPACT & STATS (3 Colonnes) ——— */}
                    <motion.div className={styles.topStatsGrid} variants={itemVariants}>
                        <div className={`${styles.statCard} ${styles.savingCard}`}>
                            <div className={styles.statIconWrap}>
                                <TrendingUp size={22} color="#15803d" />
                            </div>
                            <div className={styles.statInfo}>
                                <h3>Argent Économisé</h3>
                                <div className={styles.statLine}>
                                    <span className={styles.statVal}>{MOCK_STATS.economies} DH</span>
                                    <span className={styles.statExtra}>+{MOCK_STATS.gains} gagnés</span>
                                </div>
                            </div>
                            {/* Graphic vector accent (like sparkline) */}
                            <svg className={styles.statCurve} viewBox="0 0 100 30" preserveAspectRatio="none">
                                <path d="M0,30 Q30,15 50,20 T100,5" fill="none" stroke="rgba(21, 128, 61, 0.2)" strokeWidth="3" />
                            </svg>
                        </div>

                        <div className={`${styles.statCard} ${styles.activeCard}`}>
                            <div className={styles.statIconWrap}>
                                <BookHeart size={22} color="#0369a1" />
                            </div>
                            <div className={styles.statInfo}>
                                <h3>Manuels Partagés</h3>
                                <div className={styles.statLine}>
                                    <span className={styles.statVal}>{MOCK_STATS.livresPartages} Livres</span>
                                    <span className={styles.statExtra}>En circulation</span>
                                </div>
                            </div>
                            <svg className={styles.statCurve} viewBox="0 0 100 30" preserveAspectRatio="none">
                                <path d="M0,25 Q30,5 50,15 T100,10" fill="none" stroke="rgba(3, 105, 161, 0.2)" strokeWidth="3" />
                            </svg>
                        </div>

                        <div className={`${styles.statCard} ${styles.ecoCard}`}>
                            <div className={styles.statIconWrap}>
                                <Leaf size={22} color="#047857" />
                            </div>
                            <div className={styles.statInfo}>
                                <h3>Impact Écologique</h3>
                                <div className={styles.statLine}>
                                    <span className={styles.statVal}>{MOCK_STATS.arbresSauves} Arbres</span>
                                    <span className={styles.statExtra}>Sauvetage CO2</span>
                                </div>
                            </div>
                            <svg className={styles.statCurve} viewBox="0 0 100 30" preserveAspectRatio="none">
                                <path d="M0,30 Q20,10 60,25 T100,0" fill="none" stroke="rgba(4, 120, 87, 0.2)" strokeWidth="3" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* ——— SPLIT CONTROL CENTER (65/35) ——— */}
                    <div className={styles.splitGrid}>
                        
                        {/* === COLONNE GAUCHE (65%) : INVENTAIRE === */}
                        <div className={styles.leftCol}>
                            
                            <motion.div className={styles.panel} variants={itemVariants}>
                                <div className={styles.panelHeader}>
                                    <h2>Mon Inventaire Actif</h2>
                                    <div className={styles.panelFilters}>
                                        <button className={styles.filterPillActive}>Tous</button>
                                        <button className={styles.filterPill}>En ligne (1)</button>
                                        <button className={styles.filterPill}>En attente (1)</button>
                                    </div>
                                </div>
                                <div className={styles.inventoryList}>
                                    {MOCK_LISTINGS.map(l => {
                                        const StatusIcon = STATUS_STYLES[l.status].icon;
                                        return (
                                            <div key={l.id} className={styles.inventoryCard}>
                                                <div className={styles.invImageWrap}>
                                                    <img src={l.image} alt={l.titre} />
                                                    <span className={styles.invBadgeType}>{l.type}</span>
                                                </div>
                                                <div className={styles.invContent}>
                                                    <div className={styles.invTitleRow}>
                                                        <h4>{l.titre}</h4>
                                                        <span className={styles.invPrice}>{l.prix}</span>
                                                    </div>
                                                    <div className={styles.invMeta}>
                                                        <span className={styles.invStatus} style={{ background: STATUS_STYLES[l.status].bg, color: STATUS_STYLES[l.status].color }}>
                                                            <StatusIcon size={12} /> {STATUS_STYLES[l.status].label}
                                                        </span>
                                                        <span className={styles.invViews}>• {l.vues} vues</span>
                                                    </div>
                                                    <div className={styles.invActions}>
                                                        {l.status === 'EXPIREE' ? (
                                                            <button className={styles.btnActionPro}>Prolonger (+30j)</button>
                                                        ) : (
                                                            <button className={styles.btnActionSub}>Promouvoir (Boost)</button>
                                                        )}
                                                        <button className={styles.btnActionIcon} title="Modifier"><Edit2 size={16} /></button>
                                                        <button className={styles.btnActionIconDanger} title="Archiver"><Trash2 size={16} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </motion.div>

                            <motion.div className={styles.panel} variants={itemVariants}>
                                <div className={styles.panelHeader}>
                                    <h2>Brouillons & Archives (0)</h2>
                                    <p className={styles.mutedText}>Aucun manuel inactif pour le moment.</p>
                                </div>
                            </motion.div>

                        </div>

                        {/* === COLONNE DROITE (35%) : INBOX & RADAR === */}
                        <div className={styles.rightCol}>
                            
                            {/* BOITE D'ACTION (L'urgence en premier) */}
                            <motion.div className={styles.panelAction} variants={itemVariants}>
                                <div className={styles.panelActionHeader}>
                                    <h2>Actions Requises</h2>
                                    <span className={styles.pulseDot}></span>
                                </div>
                                <div className={styles.actionList}>
                                    {MOCK_ACTIONS_REQUISES.map(act => (
                                        <div key={act.id} className={styles.actionItem}>
                                            <div className={styles.actionTop}>
                                                <div className={styles.actionAvatar}>{act.avatar}</div>
                                                <div className={styles.actionText}>
                                                    <p><strong>{act.avec}</strong> a demandé <em>{act.livre}</em></p>
                                                    <span className={styles.actionTime}>{act.temps}</span>
                                                </div>
                                            </div>
                                            <div className={styles.actionBtns}>
                                                <button className={styles.btnAccept}><CheckCircle size={14} /> Accepter</button>
                                                <button className={styles.btnRefuse}><XCircle size={14} /> Refuser</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* LE PASS CAMPUS (QR Code Generator) */}
                            <motion.div className={styles.panelQr} variants={itemVariants}>
                                <div className={styles.qrHeader}>
                                    <ShieldCheck size={20} color="#6366f1" />
                                    <h2>Pass Campus</h2>
                                </div>
                                <p>Un échange de prévu aujourd'hui ? Générez votre code QR sécurisé pour la remise en main propre.</p>
                                <button className={styles.btnQrGenerate}>
                                    <div className={styles.qrIconFake}></div>
                                    Voir mon code d'Échange
                                </button>
                            </motion.div>

                            {/* WISHLIST RADAR */}
                            <motion.div className={styles.panelRadar} variants={itemVariants}>
                                <div className={styles.RadarHeader}>
                                    <h2>Radar Wishlist</h2>
                                    <span className={styles.radarBadge}>1 Match !</span>
                                </div>
                                <div className={styles.radarList}>
                                    {MOCK_WISHES_RADAR.map(w => (
                                        <div key={w.id} className={`${styles.radarItem} ${w.match ? styles.radarMatch : ''}`}>
                                            <div className={styles.radarInfo}>
                                                <strong>{w.titre}</strong>
                                                <span>{w.auteur}</span>
                                            </div>
                                            {w.match ? (
                                                <button className={styles.btnRadarCatch}>Voir l'annonce 🎉</button>
                                            ) : (
                                                <span className={styles.radarWaiting}>Recherche active...</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
