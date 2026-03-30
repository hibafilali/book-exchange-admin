import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Heart, Repeat, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Wallet, ShieldCheck, Trophy, ArrowRight, Eye, PlusCircle, MessageCircle, CheckCircle2, Clock, Send, Target, ScanBarcode, Flame, Zap, Gift, Star, Award, TrendingDown } from 'lucide-react';
import { useAuth } from '../auth/useAuth';
import ManualCard from './ManualCard';
import styles from './StudentHome.module.css';

// Type to Color Map for Pills
const TYPE_COLORS = { VENTE: '#fdba74', PRET: '#7dd3fc', DON: '#6ee7b7' }; // Pastel Colors
const TYPE_TEXTS = { VENTE: '#9a3412', PRET: '#0369a1', DON: '#064e3b' }; // Darker text for contrast
const TYPE_LABELS = { VENTE: 'Vente', PRET: 'Prêt', DON: 'Don' };

// ============================
// MOCK DATA (aligné sur BDD SQL)
// ============================
const MOCK_ANNONCES = [
    { id: 1, titreAnnonce: "Algorithmes et Structures de Données", auteur: "Thomas H. Cormen", typeEchange: "VENTE", prixVente: 150, etat: "NEUF", nbVues: 230, photoUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop", ville: "Fès", filiere: "Informatique", isbn: "978-0262033848", nbOperations: 10 },
    { id: 2, titreAnnonce: "Introduction au Droit Civil", auteur: "Jean Carbonnier", typeEchange: "DON", prixVente: null, etat: "BON", nbVues: 45, photoUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop", ville: "Casablanca", filiere: "Droit", isbn: "978-2130789123", nbOperations: 1 },
    { id: 3, titreAnnonce: "Macroéconomie Approfondie", auteur: "Gregory Mankiw", typeEchange: "PRET", prixVente: null, etat: "ACCEPTABLE", nbVues: 180, photoUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop", ville: "Rabat", filiere: "Économie", isbn: "978-2807315624", nbOperations: 5 },
    { id: 4, titreAnnonce: "Architecture des Ordinateurs", auteur: "Andrew Tanenbaum", typeEchange: "VENTE", prixVente: 200, etat: "NEUF", nbVues: 310, photoUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=500&fit=crop", ville: "Fès", filiere: "Informatique", isbn: "978-2744076480", nbOperations: 8 },
    { id: 5, titreAnnonce: "Comptabilité Générale", auteur: "Brahim Aaouid", typeEchange: "VENTE", prixVente: 75, etat: "BON", nbVues: 90, photoUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop", ville: "Marrakech", filiere: "Gestion", isbn: "978-9954304567", nbOperations: 0 },
    { id: 6, titreAnnonce: "Programmation en Java", auteur: "Claude Delannoy", typeEchange: "PRET", prixVente: null, etat: "BON", nbVues: 95, photoUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=500&fit=crop", ville: "Fès", filiere: "Informatique", isbn: "978-2212678901", nbOperations: 4 },
    { id: 7, titreAnnonce: "Droit des Obligations", auteur: "Philippe Malaurie", typeEchange: "VENTE", prixVente: 85, etat: "BON", nbVues: 67, photoUrl: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=500&fit=crop", ville: "Tanger", filiere: "Droit", isbn: "978-2275045678", nbOperations: 2 },
    { id: 8, titreAnnonce: "Base de Données Relationnelles", auteur: "Georges Gardarin", typeEchange: "VENTE", prixVente: 120, etat: "NEUF", nbVues: 205, photoUrl: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400&h=500&fit=crop", ville: "Fès", filiere: "Informatique", isbn: "978-2212091234", nbOperations: 12 },
    { id: 9, titreAnnonce: "Physique Quantique", auteur: "Jean-Louis Basdevant", typeEchange: "DON", prixVente: null, etat: "ACCEPTABLE", nbVues: 160, photoUrl: "error-trigger.png", ville: "Rabat", filiere: "Physique", isbn: "978-2100494684", nbOperations: 6 },
    { id: 10, titreAnnonce: "Marketing Digital", auteur: "Dave Chaffey", typeEchange: "VENTE", prixVente: 180, etat: "NEUF", nbVues: 140, photoUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop", ville: "Casablanca", filiere: "Gestion", isbn: "978-2098765432", nbOperations: 3 },
];

const MOCK_RECOMMENDATIONS = [
    { id: 101, titreAnnonce: "Clean Code", auteur: "Robert C. Martin", photoUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" },
    { id: 102, titreAnnonce: "Design Patterns", auteur: "Gang of Four", photoUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad8?w=400&q=80" },
    { id: 103, titreAnnonce: "Pragmatic Programmer", auteur: "Andrew Hunt", photoUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80" },
    { id: 104, titreAnnonce: "Refactoring UI", auteur: "Adam Wathan", photoUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&q=80" },
    { id: 105, titreAnnonce: "You Don't Know JS", auteur: "Kyle Simpson", photoUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80" },
    { id: 106, titreAnnonce: "System Design Interview", auteur: "Alex Xu", photoUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80" }
];

const MOCK_EMPRUNTS = [
    { id: 201, titre: "Base de données relationnelles", rendu: "À rendre dans 3 jours", urgence: "haute", image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=100&q=80" },
    { id: 202, titre: "Architecture des Ordinateurs", rendu: "En cours (reste 12 j.)", urgence: "basse", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100&q=80" }
];

const MOCK_TIMELINE = [
    { id: 301, icon: 'message', couleur: '#8b5cf6', texte: "Sarah M. a demandé votre livre", livre: "Systèmes d'exploitation", temps: "Il y a 2 heures" },
    { id: 302, icon: 'check', couleur: '#10b981', texte: "Demande de prêt acceptée par", livre: "Thomas (Intro au Droit)", temps: "Hier à 14:30" },
    { id: 303, icon: 'book', couleur: '#3b82f6', texte: "Vous avez publié une annonce", livre: "Algorithmes (Neuf)", temps: "Il y a 3 jours" }
];

const QUICK_STATS = [
    { label: 'Annonces Actives', value: '12', icon: BookOpen, gradient: 'var(--gradient-vente)' },
    { label: 'Livres Sauvegardés', value: '5', icon: Heart, gradient: 'var(--gradient-pret)' },
    { label: 'Prêts en cours', value: '2', icon: Repeat, gradient: 'var(--gradient-don)' },
];

const FILTERS = ['Tous', 'Vente', 'Prêt', 'Don'];
const FILTER_MAP = { 'Tous': null, 'Vente': 'VENTE', 'Prêt': 'PRET', 'Don': 'DON' };
const FAST_FILTERS = [
    { id: 'filiere', label: 'Ma Filière', icon: Flame, color: '#f97316' },
    { id: 'today', label: 'Ajoutés aujourd\'hui', icon: Zap, color: '#eab308' },
    { id: 'free', label: 'Gratuits', icon: Gift, color: '#10b981' }
];

const MOCK_FAST_CATEGORIES = [
    { id: 1, label: 'Informatique', icon: '💻', color: 'rgba(59, 130, 246, 0.08)' },
    { id: 2, label: 'Médecine', icon: '⚕️', color: 'rgba(239, 68, 68, 0.08)' },
    { id: 3, label: 'Droit', icon: '⚖️', color: 'rgba(139, 92, 246, 0.08)' },
    { id: 4, label: 'Économie', icon: '📉', color: 'rgba(16, 185, 129, 0.08)' }
];

const MOCK_LEADERBOARD = [
    { id: 1, pseudo: 'Omar B.', livres: 14, points: 142, rang: 1, color: '#eab308', crown: '👑' },
    { id: 2, pseudo: 'Sofia M.', livres: 10, points: 98, rang: 2, color: '#94a3b8', crown: '🥈' },
    { id: 3, pseudo: 'Leïla K.', livres: 7, points: 73, rang: 3, color: '#b45309', crown: '🥉' },
];

// ============================
// COMPONENT MAIN
// ============================
export default function StudentHome() {
    const { user } = useAuth();
    const [activeFilter, setActiveFilter] = useState('Tous');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [imageErrors, setImageErrors] = useState({});
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    // Simuler le chargement pour les Skeletons
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    // Filter logic
    const filteredAnnonces = MOCK_ANNONCES.filter(a => {
        const typeMatch = FILTER_MAP[activeFilter] ? a.typeEchange === FILTER_MAP[activeFilter] : true;
        const searchMatch = searchQuery === '' || 
            a.titreAnnonce.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.auteur.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.isbn.includes(searchQuery);
        return typeMatch && searchMatch;
    });

    // Filière-specific slider (Informatique for mock)
    const filiereAnnonces = MOCK_ANNONCES.filter(a => a.filiere === 'Informatique');

    const scrollSlider = (dir) => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.page}>

            {/* ====== HERO (V2) ====== */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Hey Thomas Durand,</h1>
                    <p className={styles.heroSub}>Bienvenue sur ton espace étudiant. Que cherches-tu aujourd'hui ?</p>
                    
                    {/* V4: Actions Primaires (Mobile friendly) */}
                    <div className={styles.heroActions}>
                        <button className={styles.heroBtnPublish} onClick={() => navigate('/student-dashboard/publish')}>
                            <PlusCircle size={18} /> Publier un manuel
                        </button>
                        <button className={styles.heroBtnScan} onClick={() => alert('Ouverture de la caméra pour scanner le code barre...')}>
                            <ScanBarcode size={18} /> Scanner ISBN
                        </button>
                    </div>
                </div>
            </section>

            {/* ====== QUICK STATS (Standard Grid V2) ====== */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    
                    {/* Économies réalisées avec V4 Sparkline */}
                    <motion.div 
                        className={`${styles.statCard} ${styles.savingCard}`}
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    >
                        <div className={styles.bentoHeader}>
                            <div className={styles.iconCircleMode} style={{ color: '#10b981' }}>
                                <Wallet size={18} />
                            </div>
                        </div>
                        <div className={styles.bentoBody}>
                            <span className={styles.miniVal}>1 250 DH</span>
                            <span className={styles.miniLabel}>Économies ce semestre</span>
                        </div>
                        <svg className={styles.sparklineO} viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path d="M0,30 Q20,20 40,25 T80,10 T100,5" fill="none" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="100" cy="5" r="3" fill="#10b981" />
                        </svg>
                    </motion.div>

                    {/* Annonces Actives */}
                    <motion.div 
                        className={`${styles.statCard} ${styles.activeCard}`}
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    >
                        <div className={styles.bentoHeader}>
                            <div className={styles.iconCircleMode} style={{ color: '#0ea5e9' }}>
                                <BookOpen size={18} />
                            </div>
                        </div>
                        <div className={styles.bentoBody}>
                            <span className={styles.miniVal}>12</span>
                            <span className={styles.miniLabel}>Annonces Actives</span>
                        </div>
                    </motion.div>

                    {/* Sauvegardés */}
                    <motion.div 
                        className={`${styles.statCard} ${styles.favorisCard}`}
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    >
                        <div className={styles.bentoHeader}>
                            <div className={styles.iconCircleMode} style={{ color: '#ec4899' }}>
                                <Heart size={18} />
                            </div>
                        </div>
                        <div className={styles.bentoBody}>
                            <span className={styles.miniVal}>5</span>
                            <span className={styles.miniLabel}>Livres en Favoris</span>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* ====== V3: CARROUSEL DE RECOMMANDATIONS ====== */}
            <section className={styles.carouselSection}>
                <div className={styles.gridHeader}>
                    <div className={styles.gridTitle}>
                        <TrendingUp size={22} className={styles.gridTitleIcon} style={{color: '#8b5cf6'}} />
                        <h2>Recommandés pour votre filière · Informatique</h2>
                    </div>
                </div>

                <div className={styles.carouselWrap}>
                    {MOCK_RECOMMENDATIONS.map((rec) => (
                        <motion.div 
                            key={rec.id} 
                            className={styles.carouselCard}
                            whileHover={{ y: -4 }}
                        >
                            <img src={rec.photoUrl} alt={rec.titreAnnonce} loading="lazy" />
                            <div className={styles.carouselInfo}>
                                <h4 className={styles.carouselTitle}>{rec.titreAnnonce}</h4>
                                <p className={styles.carouselAuthor}>{rec.auteur}</p>
                            </div>
                        </motion.div>
                    ))}
                    {/* Fake elements for natural fade out at the end */}
                    <div className={styles.carouselBuffer}></div>
                </div>
            </section>

            {/* ====== V3: SPLIT LAYOUT 70/30 (Grid/Listes) ====== */}
            <div className={styles.dashboardSplit}>
                
                {/* --- 70% MAIN COLUMN --- */}
                <div className={styles.mainColumn}>
                    
                    {/* V4: ALERT WISH TARGET */}
                    <motion.div 
                        className={styles.wishlistAlertBlock}
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    >
                        <div className={styles.alertTargetLeft}>
                            <div className={styles.alertTargetIconObj}><Target size={22} color="#4f46e5" /></div>
                            <div>
                                <h4 className={styles.alertTargetTitle}>Coup de chance !</h4>
                                <p className={styles.alertTargetText}><strong>3 étudiants</strong> de votre faculté cherchent des livres que vous possédez.</p>
                            </div>
                        </div>
                        <button className={styles.alertTargetBtn}>Vendre mes livres</button>
                    </motion.div>

                    {/* V5: FAST CATEGORIES BENTO */}
                    <motion.div className={styles.fastCategoriesBar} initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{delay: 0.3}}>
                        {MOCK_FAST_CATEGORIES.map(cat => (
                            <div key={cat.id} className={styles.fastCatCard} style={{ '--cat-bg': cat.color }}>
                                <span className={styles.fastCatIcon}>{cat.icon}</span>
                                <span className={styles.fastCatLabel}>{cat.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    <section className={styles.gridSection}>
                        <div className={styles.gridHeader}>
                            <div className={styles.gridTitle}>
                                <Sparkles size={22} className={styles.gridTitleIcon} style={{color: 'var(--accent-color)'}}/>
                                <h2>Dernières Annonces</h2>
                            </div>
                        </div>

                        {/* V4: DYNAMIC FILTERS PILLS */}
                        <div className={styles.dynamicFiltersBar}>
                            <button 
                                className={`${styles.dynamicPill} ${activeFilter === 'Tous' ? styles.pillActive : ''}`} 
                                onClick={() => setActiveFilter('Tous')}
                            >
                                Tous
                            </button>
                            {FAST_FILTERS.map(f => {
                                const Icon = f.icon;
                                return (
                                    <button
                                        key={f.id}
                                        className={`${styles.dynamicPill} ${activeFilter === f.id ? styles.pillActive : ''}`}
                                        onClick={() => setActiveFilter(f.id)}
                                        style={activeFilter === f.id ? { borderColor: f.color, color: f.color, background: `${f.color}15` } : {}}
                                    >
                                        <Icon size={14} style={{color: f.color}} /> {f.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className={styles.cardsGrid}>
                    <AnimatePresence>
                        {isLoading ? (
                            // --- SKELETON LOADERS ---
                            Array.from({ length: 10 }).map((_, i) => (
                                <motion.div key={`skeleton-${i}`} className={styles.bestBookCard}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                >
                                    <div className={`${styles.bestBookImgWrap} ${styles.skeletonPulse}`} style={{ height: '240px', background: '#f1f5f9' }}></div>
                                    <div className={styles.bestBookInfoMinimal}>
                                        <div className={styles.skeletonPulse} style={{ height: '18px', width: '80%', background: '#f1f5f9', marginBottom: '8px', borderRadius: '4px' }}></div>
                                        <div className={styles.skeletonPulse} style={{ height: '14px', width: '40%', background: '#f1f5f9', borderRadius: '4px' }}></div>
                                    </div>
                                </motion.div>
                            ))
                        ) : filteredAnnonces.length > 0 ? (
                            // --- ACTUAL BOOKS (Floating Design V2) ---
                            filteredAnnonces.map((b, i) => (
                                <motion.div key={b.id} className={styles.bestBookCard}
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                                    onClick={() => navigate(`/student-dashboard/book/${b.id}`)}
                                >
                                    <div className={styles.bestBookImgWrap}>
                                        {imageErrors[b.id] ? (
                                            <div className={styles.fallbackImgWrap}>
                                                <BookOpen size={32} className="opacity-40" strokeWidth={1.5} />
                                            </div>
                                        ) : (
                                            <img 
                                                src={b.photoUrl} 
                                                alt={b.titreAnnonce} 
                                                loading="lazy"
                                                onError={() => setImageErrors(prev => ({...prev, [b.id]: true}))}
                                            />
                                        )}

                                        {/* Floating Badge — Top LEFT (identique landing) */}
                                        <div className={styles.floatingBadge} style={{ background: TYPE_COLORS[b.typeEchange], color: TYPE_TEXTS[b.typeEchange] }}>
                                            {TYPE_LABELS[b.typeEchange]}
                                        </div>

                                        {/* Action Buttons — Top RIGHT (toujours visibles) */}
                                        <div className={styles.actionButtons}>
                                            <button className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); navigate(`/student-dashboard/book/${b.id}`) }}><Eye size={14} /></button>
                                            <button className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); }}><Heart size={14} /></button>
                                        </div>
                                    </div>

                                    <div className={styles.bestBookInfoMinimal}>
                                        <h4 className={styles.bestBookTitle}>{b.titreAnnonce}</h4>
                                        <div className={styles.bestBookPriceMinimal}>
                                            {b.prixVente ? (
                                                <span className={styles.priceTag}>{b.prixVente} DH</span>
                                            ) : (
                                                <span className={styles.freeTag}>Gratuit</span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            // --- EMPTY STATE (Creative) ---
                            <div className={styles.emptyStateCreative}>
                                <div className={styles.emptyIconWrap}>
                                    <BookOpen size={48} className={styles.emptyIcon} />
                                    <Sparkles size={24} className={styles.emptySparkle} />
                                </div>
                                <h3>C'est un peu vide par ici...</h3>
                                <p>Soyez le premier de votre filière à proposer un manuel d'occasion !</p>
                                <button className={styles.publishEmptyBtn} onClick={() => navigate('/student-dashboard/publish')}>
                                    <PlusCircle size={18} /> Publier ma première annonce
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
        {/* --- END 70% MAIN COLUMN --- */}

        {/* --- 30% ASIDE COLUMN --- */}
        <aside className={styles.asideColumn}>
            
            {/* V4: GAMIFICATION TRUST SCORE */}
            <div className={`${styles.asideBox} ${styles.trustCardBox}`}>
                <div className={styles.trustHeader}>
                    <img src={`https://ui-avatars.com/api/?name=${user?.prenom}+${user?.nom}&background=4f46e5&color=fff&rounded=true`} alt="Avatar" className={styles.trustAvatar}/>
                    <div className={styles.trustIdentity}>
                        <h3 className={styles.trustName}>{user?.prenom} {user?.nom}</h3>
                        <span className={styles.trustBadge}><Award size={14} /> Membre Or</span>
                    </div>
                </div>
                
                <div className={styles.trustScoreBlock}>
                    <div className={styles.scoreRow}>
                        <span className={styles.scoreTitle}>Indice de Fiabilité</span>
                        <div className={styles.scoreValue}><Star size={14} color="#eab308" fill="#eab308" /> 4.9/5</div>
                    </div>
                    <div className={styles.scoreBarBg}>
                        <motion.div className={styles.scoreBarFill} initial={{width:0}} animate={{width:'90%'}} transition={{duration: 1, delay: 0.5}}></motion.div>
                    </div>
                    <span className={styles.scoreHint}>Plus que 3 prêts sans retard pour le rang Platine !</span>
                </div>
            </div>

            {/* EMPRUNTS EN COURS */}
            <div className={styles.asideBox}>
                <div className={styles.asideHeader}>
                    <Clock size={18} className={styles.asideIcon} style={{color: '#f59e0b'}} />
                    <h3>Emprunts en cours</h3>
                </div>
                <div className={styles.empruntsList}>
                    {MOCK_EMPRUNTS.map(emprunt => (
                        <div key={emprunt.id} className={styles.empruntItem}>
                            <img src={emprunt.image} alt="Livre" className={styles.empruntImg} />
                            <div className={styles.empruntInfo}>
                                <h4>{emprunt.titre}</h4>
                                <span className={`${styles.empruntStatus} ${emprunt.urgence === 'haute' ? styles.statusUrgent : styles.statusNormal}`}>
                                    {emprunt.rendu}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* V6: CAMPUS LEADERBOARD (Premium Podium) */}
            <div className={styles.asideBox}>
                <div className={styles.asideHeader}>
                    <Trophy size={18} className={styles.asideIcon} style={{color: '#eab308'}} />
                    <h3>Top Héros du Campus</h3>
                </div>
                <div className={styles.leaderboardList}>
                    {MOCK_LEADERBOARD.map(userItem => (
                        <div key={userItem.id} className={styles.leaderboardRow}>
                            <div className={styles.leaderRankNum} style={{background: userItem.color}}>
                                {userItem.rang}
                            </div>
                            <div className={styles.leaderAvatarWrap}>
                                <img src={`https://ui-avatars.com/api/?name=${userItem.pseudo.split(' ')[0]}&background=f8fafc&color=334155&rounded=true&size=72`} alt={userItem.pseudo} className={styles.leaderAvatar}/>
                            </div>
                            <div className={styles.leaderInfo}>
                                <h4>{userItem.crown} {userItem.pseudo}</h4>
                                <span>{userItem.livres} manuels prêtés</span>
                            </div>
                            <span className={styles.leaderPoints}>{userItem.points} pts</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* TIMELINE ACTIVITÉ */}
            <div className={styles.asideBox}>
                <div className={styles.asideHeader}>
                    <MessageCircle size={18} className={styles.asideIcon} style={{color: '#3b82f6'}} />
                    <h3>Activité récente</h3>
                </div>
                <div className={styles.timeline}>
                    {MOCK_TIMELINE.map((evt, idx) => (
                        <div key={evt.id} className={styles.timelineItem}>
                            <div className={styles.timelineNode}>
                                <img src={`https://ui-avatars.com/api/?name=${evt.texte[0]}&background=f1f5f9&color=64748b&rounded=true`} alt="Avatar" style={{width:'100%', height:'100%', borderRadius:'50%'}} />
                            </div>
                            {idx !== MOCK_TIMELINE.length - 1 && <div className={styles.timelineLine}></div>}
                            <div className={styles.timelineContent}>
                                <p className={styles.timelineText}>{evt.texte}</p>
                                <strong className={styles.timelineBook}>{evt.livre}</strong>
                                <span className={styles.timelineTime}>{evt.temps}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </aside>
    </div>

    {/* ====== V3: BANNÈRE CALL-TO-ACTION ====== */}
    <motion.section 
        className={styles.ctaBanner}
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }}
    >
        <div className={styles.ctaBannerContent}>
            <h2>Faites de la place sur vos étagères !</h2>
            <p>Partagez les manuels du semestre dernier avec les autres étudiants de votre filière. Un petit geste, un grand impact.</p>
        </div>
        <button className={styles.ctaBannerBtn} onClick={() => navigate('/student-dashboard/publish')}>
            <Send size={18} /> Publier un manuel
        </button>
    </motion.section>

</div>
);
}
