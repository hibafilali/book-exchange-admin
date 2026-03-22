import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    MapPin, Calendar, Star, MessageSquare, ShieldCheck, 
    Share2, Flag, Award, CheckCircle2, Package
} from 'lucide-react';
import ManualCard from './ManualCard';
import styles from './SellerProfile.module.css';

// ============================
// MOCK DATA GENERATION
// ============================
const unslugify = (slug) => {
    if (!slug) return 'Utilisateur';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const SELLER_ADS = [
    { id: 4, titreAnnonce: "Architecture des Ordinateurs", auteur: "Andrew Tanenbaum", typeEchange: "VENTE", prixVente: 200, etat: "NEUF", nbVues: 310, photoUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=500&fit=crop", ville: "Casablanca", filiere: "Informatique", isbn: "978-2744076480", nbOperations: 8, datePublication: "2026-03-22" },
    { id: 8, titreAnnonce: "Base de Données Relationnelles", auteur: "Georges Gardarin", typeEchange: "VENTE", prixVente: 130, etat: "NEUF", nbVues: 205, photoUrl: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400&h=500&fit=crop", ville: "Casablanca", filiere: "Informatique", isbn: "978-2212091234", nbOperations: 12, datePublication: "2026-03-19" },
    { id: 10, titreAnnonce: "Marketing Digital", auteur: "Dave Chaffey", typeEchange: "DON", prixVente: null, etat: "BON", nbVues: 140, photoUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop", ville: "Casablanca", filiere: "Gestion", isbn: "978-2098765432", nbOperations: 3, datePublication: "2026-03-17" },
];

const REVIEWS = [
    { id: 1, author: 'Sara L.', rating: 5, date: 'Il y a 2 jours', text: 'Super échange. Livre conforme à la description, état neuf. Amine est très réactif !' },
    { id: 2, author: 'Omar K.', rating: 5, date: 'La semaine dernière', text: 'Parfait ! RDV à l\'heure sur le campus, rien à dire.' },
    { id: 3, author: 'Leïla B.', rating: 4, date: 'Il y a 1 mois', text: 'Bon état, livre très utile pour le S3. Merci.' }
];

export default function SellerProfile() {
    const { id } = useParams(); // URL slug like "ahmed-benali"
    const navigate = useNavigate();

    // Dynamically generate user info based on id
    const name = id ? unslugify(id) : 'Utilisateur';
    
    // Deterministic pseudo-randomness based on name length or chars
    const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const exchangesCount = (nameHash % 30) + 1;
    const isVerifie = exchangesCount > 5;
    const rawRating = Math.max(3.5, ((nameHash % 50) / 10)).toFixed(1);
    const rating = parseFloat(rawRating) > 5 ? 5.0 : parseFloat(rawRating) || 4.8;
    const reviewsCount = Math.floor(exchangesCount * 0.7);
    
    const SELLER_DATA = {
        name: name,
        avatar: name.charAt(0).toUpperCase(),
        ville: nameHash % 2 === 0 ? 'Casablanca' : 'Fès',
        filiere: nameHash % 3 === 0 ? 'Ingénierie Informatique' : (nameHash % 2 === 0 ? 'Médecine' : 'Droit & Gestion'),
        joined: nameHash % 2 === 0 ? 'Septembre 2024' : 'Février 2025',
        isVerifie,
        rating,
        reviewsCount,
        exchangesCount,
        responseRate: (90 + (nameHash % 10)) + '%',
        responseTime: nameHash % 2 === 0 ? '< 1 heure' : '< 1 jour',
        bio: `Salut ! Je suis ${name}. Je propose mes anciens manuels d'études. N'hésitez pas à me contacter pour toute information ! Remise en main propre privilégiée.`
    };

    return (
        <div className={styles.page}>
            {/* ====== HEADER BANNER ====== */}
            <div className={styles.headerWrap}>
                <div className={styles.coverPhoto}></div>
                
                <div className={styles.profileMetaBox}>
                    <motion.div 
                        className={styles.avatarWrap}
                        initial={{ scale: 0.8, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                    >
                        <div className={styles.avatar}>{SELLER_DATA.avatar}</div>
                        {SELLER_DATA.isVerifie && (
                            <div className={styles.verifiedBadge} title="Étudiant vérifié">
                                <ShieldCheck size={18} />
                            </div>
                        )}
                    </motion.div>

                    <div className={styles.profileInfo}>
                        <div className={styles.nameRow}>
                            <h1>{SELLER_DATA.name}</h1>
                            {SELLER_DATA.exchangesCount > 20 && (
                                <span className={styles.topSellerTag}><Award size={14} /> Top Contributeur</span>
                            )}
                        </div>
                        
                        <div className={styles.statsRow}>
                            <span className={styles.ratingBadge}>
                                <Star size={14} fill="currentColor" /> {SELLER_DATA.rating} ({SELLER_DATA.reviewsCount} avis)
                            </span>
                            <span className={styles.metaItem}><MapPin size={14} /> {SELLER_DATA.ville}</span>
                            <span className={styles.metaItem}><Calendar size={14} /> Membre depuis {SELLER_DATA.joined}</span>
                        </div>
                    </div>

                    <div className={styles.profileActions}>
                        <button className={styles.msgBtn} onClick={() => navigate('/student-dashboard/messages')}>
                            <MessageSquare size={16} /> Contacter
                        </button>
                        <div className={styles.actionButtonGroup}>
                            <button className={styles.iconBtn} title="Partager ce profil"><Share2 size={16} /></button>
                            <button className={styles.iconBtn} title="Signaler" style={{ color: '#ef4444' }}><Flag size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.contentGrid}>
                {/* ====== LEFT COLUMN : SIDEBAR ====== */}
                <div className={styles.sidebar}>
                    <div className={styles.bentoBox}>
                        <h3>À propos de {SELLER_DATA.name.split(' ')[0]}</h3>
                        <p className={styles.bio}>{SELLER_DATA.bio}</p>
                        <div className={styles.filiereTag}>{SELLER_DATA.filiere}</div>
                    </div>

                    <div className={styles.bentoBox}>
                        <h3>Statistiques</h3>
                        <div className={styles.statList}>
                            <div className={styles.statLine}>
                                <span><Package size={16} className={styles.iconBrand} /> Échanges réalisés</span>
                                <strong>{SELLER_DATA.exchangesCount}</strong>
                            </div>
                            <div className={styles.statLine}>
                                <span><CheckCircle2 size={16} className={styles.iconGreen} /> Taux de réponse</span>
                                <strong>{SELLER_DATA.responseRate}</strong>
                            </div>
                            <div className={styles.statLine}>
                                <span><MessageSquare size={16} className={styles.iconBlue} /> Temps de réponse</span>
                                <strong>{SELLER_DATA.responseTime}</strong>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bentoBox}>
                        <h3>Derniers Avis ({SELLER_DATA.reviewsCount})</h3>
                        <div className={styles.reviewsList}>
                            {REVIEWS.map(r => (
                                <div key={r.id} className={styles.reviewCard}>
                                    <div className={styles.reviewHead}>
                                        <div className={styles.stars}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < r.rating ? '#f59e0b' : 'transparent'} stroke={i < r.rating ? '#f59e0b' : '#cbd5e1'} />
                                            ))}
                                        </div>
                                        <span className={styles.reviewDate}>{r.date}</span>
                                    </div>
                                    <p className={styles.reviewText}>"{r.text}"</p>
                                    <span className={styles.reviewAuthor}>— {r.author}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ====== RIGHT COLUMN : ANNONCES ACTIVES ====== */}
                <div className={styles.mainFeed}>
                    <div className={styles.sectionHeader}>
                        <h2>Annonces de {SELLER_DATA.name.split(' ')[0]} ({SELLER_ADS.length})</h2>
                    </div>

                    <div className={styles.listingsGrid}>
                        {SELLER_ADS.map((b, i) => (
                            <ManualCard key={b.id} annonce={b} index={i}
                                onCardClick={(ann) => navigate(`/student-dashboard/book/${ann.id}`)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
