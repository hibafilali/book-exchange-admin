import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, Leaf, BookHeart, Plus, Edit2, Trash2, CheckCircle,
    Clock, XCircle, Bell, MessageSquare, ExternalLink, ShieldCheck, Send, Sparkles,
    Calendar, MapPin
} from 'lucide-react';
import { useAuth } from '../auth/useAuth';
import { ALL_BOOKS } from '../../data/mockBooks';
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

// --- MAP LISTINGS FROM CENTRAL DATA (IDs 11, 10, 12 for Hiba) ---
const MOCK_LISTINGS = [
    { ...ALL_BOOKS.find(b => b.id === 11), status: 'VALIDEE' },
    { ...ALL_BOOKS.find(b => b.id === 10), status: 'ATTENTE' },
    { ...ALL_BOOKS.find(b => b.id === 12), status: 'EXPIREE' },
];

const MOCK_ACTIONS_REQUISES = [
    { id: 101, type: 'DEMANDE_PRET', livre: 'Algorithmes', avec: 'Sofia M.', avatar: 'S', temps: 'Il y a 30 min' },
    { id: 102, type: 'CONFIRM_REMISE', livre: 'Macroéconomie', avec: 'Omar B.', avatar: 'O', temps: 'Il y a 2h' },
];

const MOCK_WISHES_RADAR = [
    { id: 1, titre: 'Marketing Digital', auteur: 'D. Chaffey', match: true, edition: '2023' },
    { id: 2, titre: 'Bases de Données', auteur: 'G. Gardarin', match: false, edition: 'Peu importe' },
];

const MOCK_APPOINTMENTS = [
    { id: 1, livre: 'Designing Data-Intensive...', avec: 'Sophie M.', temps: 'Demain, 10:30', lieu: 'Bibliothèque (BU)', type: 'REMISE' },
    { id: 2, livre: 'Clean Code', avec: 'Anas L.', temps: 'Samedi, 14:00', lieu: 'Cafétéria Centrale', type: 'RECEPTION' },
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
                                    {MOCK_LISTINGS.map(listing => {
                                        const StatusIcon = STATUS_STYLES[listing.status].icon;
                                        return (
                                            <div key={listing.id} className={styles.inventoryCard}>
                                                <div className={styles.invImageWrap}>
                                                    <img src={listing.photoUrl} alt={listing.titreAnnonce} />
                                                </div>
                                                <div className={styles.invContent}>
                                                    <div className={styles.invMain}>
                                                        <div className={styles.listingInfo}>
                                                            <h3>{listing.titreAnnonce}</h3>
                                                            <div className={styles.listingMeta}>
                                                                <span className={styles.typeBadge} style={{ backgroundColor: listing.typeEchange === 'VENTE' ? '#F97316' : listing.typeEchange === 'PRET' ? '#06B6D4' : '#10B981' }}>{listing.typeEchange}</span>
                                                                <span className={styles.priceText}>{listing.typeEchange === 'VENTE' ? `${listing.prixVente} DH` : listing.typeEchange === 'DON' ? 'Gratuit' : 'Prêt'}</span>
                                                            </div>
                                                        </div>
                                                        <div className={styles.invMeta}>
                                                            <span className={styles.invStatus} style={{ background: STATUS_STYLES[listing.status].bg, color: STATUS_STYLES[listing.status].color }}>
                                                                <StatusIcon size={12} /> {STATUS_STYLES[listing.status].label}
                                                            </span>
                                                            <span className={styles.invViews}>• {listing.vues} vues</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.invActions}>
                                                        {listing.status === 'EXPIREE' ? (
                                                            <button className={styles.btnActionPro}>Prolonger (+30j)</button>
                                                        ) : (
                                                            <button className={styles.btnActionSub}>Promouvoir (Boost)</button>
                                                        )}
                                                        <div className={styles.actionIcons}>
                                                            <button className={styles.btnActionIcon} title="Modifier"><Edit2 size={16} /></button>
                                                            <button className={styles.btnActionIconDanger} title="Archiver"><Trash2 size={16} /></button>
                                                        </div>
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


                            {/* MES RENDEZ-VOUS (La section la plus utile) */}
                            <motion.div className={styles.panelAppointments} variants={itemVariants}>
                                <div className={styles.panelAppointmentsHeader}>
                                    <h2>Prochaines Remises</h2>
                                    <Calendar size={16} color="var(--accent-color)" />
                                </div>
                                <div className={styles.appointmentList}>
                                    {MOCK_APPOINTMENTS.map(ap => (
                                        <div key={ap.id} className={styles.appointmentCard}>
                                            <div className={styles.apTop}>
                                                <span className={styles.apTime}>{ap.temps}</span>
                                                <span className={ap.type === 'REMISE' ? styles.badgeRemise : styles.badgeRecep}>
                                                    {ap.type === 'REMISE' ? 'Donner' : 'Recevoir'}
                                                </span>
                                            </div>
                                            <h4 className={styles.apLivre}>{ap.livre}</h4>
                                            <div className={styles.apMeta}>
                                                <p>👤 Avec <strong>{ap.avec}</strong></p>
                                                <p className={styles.apLieu}><MapPin size={12} /> {ap.lieu}</p>
                                            </div>
                                            <button className={styles.btnApAction}>Contacter</button>
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
