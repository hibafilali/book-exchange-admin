import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, Leaf, BookHeart, Plus, Edit2, Trash2, CheckCircle,
    Clock, XCircle, Bell, MessageSquare, ExternalLink, ShieldCheck, Send, Sparkles
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

// --- IMAGES POUR LE RENDU VISUEL (STRICTEMENT ISOLÉES) ---
const IMG_REFACTORING = "/admin/books/refactoring.png";
const IMG_CAPITAL = "/admin/books/capital-piketty.png";
const IMG_TDD = "/admin/books/tdd.png";

const MOCK_LISTINGS = [
    { id: 1, titre: 'Refactoring: Improving Code...', type: 'VENTE', prix: '120 DH', status: 'VALIDEE', vues: 89, image: IMG_REFACTORING },
    { id: 2, titre: 'Le Capital au XXIe siècle', type: 'DON', prix: 'Gratuit', status: 'ATTENTE', vues: 0, image: IMG_CAPITAL },
    { id: 3, titre: 'Test-Driven Development', type: 'PRET', prix: '1 sem', status: 'EXPIREE', vues: 24, image: IMG_TDD },
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

const CATEGORIES = [
    { id: 1, label: 'Info', icon: '💻' },
    { id: 2, label: 'Médecine', icon: '⚕️' },
    { id: 3, label: 'Droit', icon: '⚖️' },
    { id: 4, label: 'Éco', icon: '📉' },
];

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
                            <h1>Bienvenue, {user?.name?.split(' ')[0] || 'Hiba'} !</h1>
                            <p>Voici votre centre de contrôle personnel. Gérez vos annonces et suivez vos échanges.</p>
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

                            {/* CTA Banner */}
                            <motion.div className={styles.cta} variants={itemVariants}>
                                <div>
                                    <h2>Faites de la place sur vos étagères !</h2>
                                    <p>Partagez vos anciens manuels. Un petit geste pour la planète, de grosses économies pour vos camarades.</p>
                                </div>
                                <button className={styles.ctaBtn} onClick={() => navigate('/student-dashboard/publish')}>
                                    <Send size={15}/> Publier un manuel
                                </button>
                            </motion.div>

                        </div>

                        {/* === COLONNE DROITE (35%) : ACTIONS & IMPACT === */}
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

                            {/* MINI PANEL IMPACT */}
                            <motion.div className={styles.panelImpact} variants={itemVariants}>
                                <div className={styles.panelImpactHeader}>
                                    <h2>Résumé d'Impact</h2>
                                    <TrendingUp size={16} color="var(--accent-color)" />
                                </div>
                                <div className={styles.impactRows}>
                                    <div className={styles.impactRow}>
                                        <div className={styles.impactIcon} style={{ background: '#ecfdf5', color: '#10b981' }}><TrendingUp size={14}/></div>
                                        <div className={styles.impactInfo}>
                                            <span className={styles.impactLabel}>Économies</span>
                                            <span className={styles.impactVal}>{MOCK_STATS.economies} DH</span>
                                        </div>
                                    </div>
                                    <div className={styles.impactRow}>
                                        <div className={styles.impactIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}><BookHeart size={14}/></div>
                                        <div className={styles.impactInfo}>
                                            <span className={styles.impactLabel}>Livres Partagés</span>
                                            <span className={styles.impactVal}>{MOCK_STATS.livresPartages}</span>
                                        </div>
                                    </div>
                                    <div className={styles.impactRow}>
                                        <div className={styles.impactIcon} style={{ background: '#fff1f2', color: '#ec4899' }}><Leaf size={14}/></div>
                                        <div className={styles.impactInfo}>
                                            <span className={styles.impactLabel}>Arbres Sauvés</span>
                                            <span className={styles.impactVal}>{MOCK_STATS.arbresSauves}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>


                            {/* LIVE DU CAMPUS (Remplaçant le Radar Wishlist) */}
                            <motion.div className={styles.panelLive} variants={itemVariants}>
                                <div className={styles.panelLiveHeader}>
                                    <h2>Le Live du Campus</h2>
                                    <Sparkles size={16} color="#eab308" />
                                </div>
                                <div className={styles.liveFeed}>
                                    <div className={styles.liveItem}>
                                        <div className={styles.liveDot} style={{ background: '#10b981' }} />
                                        <p><strong>Amine</strong> vient de donner 2 livres en <em>Informatique</em></p>
                                    </div>
                                    <div className={styles.liveItem}>
                                        <div className={styles.liveDot} style={{ background: '#3b82f6' }} />
                                        <p>Nouveau match pour votre recherche <strong>'Macroéconomie'</strong> !</p>
                                    </div>
                                    <div className={styles.liveItem}>
                                        <div className={styles.liveDot} style={{ background: '#ec4899' }} />
                                        <p><strong>Sofia</strong> a noté son dernier échange 5/5 ⭐</p>
                                    </div>
                                </div>
                                <button className={styles.btnExploreLive}>Voir tout le flux</button>
                            </motion.div>

                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
