import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    BookOpen, Search, ArrowRight, DollarSign, Leaf, Zap, 
    Users, BookMarked, TrendingUp, Heart, MapPin, Eye,
    ShoppingCart, HandHeart, Gift, ChevronRight,
    Github, Twitter, Mail, ExternalLink, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './LandingPage.module.css';

// ============================
// MOCK DATA
// ============================

const TEASER_ANNONCES = [
    {
        id: 1, titre: "Algorithmes et Structures de Données", auteur: "Thomas H. Cormen",
        type: "VENTE", prix: 150, etat: "NEUF", nbVues: 230, ville: "Fès",
        photo: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop",
    },
    {
        id: 2, titre: "Introduction au Droit Civil", auteur: "Jean Carbonnier",
        type: "DON", prix: null, etat: "BON", nbVues: 45, ville: "Casablanca",
        photo: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
    },
    {
        id: 3, titre: "Macroéconomie Approfondie", auteur: "Gregory Mankiw",
        type: "PRET", prix: null, etat: "BON", nbVues: 180, ville: "Rabat",
        photo: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop",
    },
    {
        id: 4, titre: "Architecture des Ordinateurs", auteur: "Andrew Tanenbaum",
        type: "VENTE", prix: 200, etat: "NEUF", nbVues: 310, ville: "Fès",
        photo: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=500&fit=crop",
    },
];

const TYPE_COLORS = { VENTE: '#f97316', PRET: '#2563eb', DON: '#10b981' };
const TYPE_LABELS = { VENTE: 'Vente', PRET: 'Prêt', DON: 'Don' };
const ETAT_COLORS = { NEUF: '#10b981', BON: '#2563eb', ACCEPTABLE: '#f97316', USE: '#64748b' };

const STATS = [
    { value: '450+', label: 'Manuels disponibles', icon: BookMarked },
    { value: '120+', label: 'Échanges réussis', icon: TrendingUp },
    { value: '35 000 DH', label: 'Économisés par les étudiants', icon: DollarSign },
    { value: '300+', label: 'Étudiants inscrits', icon: Users },
];

// ============================
// LANDING PAGE
// ============================

export default function LandingPage() {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const [showModal, setShowModal] = useState(false);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.page}>
            
            {/* =============== NAVBAR =============== */}
            <nav className={styles.navbar}>
                <div className={styles.navInner}>
                    <div className={styles.navLogo}>
                        <div className={styles.navLogoIcon}><BookOpen size={20} /></div>
                        <span>BourseManuels</span>
                    </div>

                    <div className={styles.navLinks}>
                        <button onClick={() => scrollTo('how')}>Comment ça marche</button>
                        <button onClick={() => scrollTo('catalogue')}>Dernières annonces</button>
                    </div>

                    <div className={styles.navActions}>
                        <button className={styles.themeToggle} onClick={toggleTheme} title={isDarkMode ? 'Mode clair' : 'Mode sombre'}>
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button className={styles.navLogin} onClick={() => navigate('/login')}>
                            Se connecter
                        </button>
                        <button className={styles.navSignup} onClick={() => navigate('/login')}>
                            Créer un compte <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* =============== HERO =============== */}
            <section className={styles.hero}>
                <div className={styles.heroBlob1}></div>
                <div className={styles.heroBlob2}></div>

                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        <Leaf size={14} /> Économie circulaire universitaire
                    </div>
                    <h1 className={styles.heroTitle}>
                        Économisez sur vos études.<br/>
                        <span className={styles.heroGradient}>Donnez une seconde vie</span> à vos manuels.
                    </h1>
                    <p className={styles.heroSub}>
                        Achetez, prêtez ou offrez vos livres universitaires entre étudiants. 
                        Zéro intermédiaire, zéro frais cachés. Rejoignez la communauté.
                    </p>

                    <div className={styles.heroSearch}>
                        <Search size={20} className={styles.heroSearchIcon} />
                        <input 
                            type="text" 
                            placeholder="Rechercher un manuel par titre, ISBN ou filière..." 
                            className={styles.heroSearchInput}
                            onFocus={() => setShowModal(true)}
                        />
                        <button className={styles.heroSearchBtn}>Rechercher</button>
                    </div>

                    <div className={styles.heroTrust}>
                        <div className={styles.heroAvatars}>
                            <div className={styles.heroAv} style={{background:'#2563eb'}}>A</div>
                            <div className={styles.heroAv} style={{background:'#f97316'}}>S</div>
                            <div className={styles.heroAv} style={{background:'#10b981'}}>M</div>
                            <div className={styles.heroAv} style={{background:'#8b5cf6'}}>K</div>
                        </div>
                        <span>Rejoint par <strong>300+ étudiants</strong> à travers le Maroc</span>
                    </div>
                </div>
            </section>

            {/* =============== HOW IT WORKS =============== */}
            <section id="how" className={styles.howSection}>
                <h2 className={styles.sectionTitle}>Comment ça marche ?</h2>
                <p className={styles.sectionSub}>Trois étapes simples pour échanger vos manuels</p>
                
                <div className={styles.steps}>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>1</div>
                        <div className={styles.stepIcon} style={{background:'rgba(37,99,235,0.1)', color:'#2563eb'}}>
                            <Search size={28} />
                        </div>
                        <h3>Cherchez votre livre</h3>
                        <p>Parcourez le catalogue par titre, ISBN, filière ou type d'échange.</p>
                    </div>
                    <div className={styles.stepLine}></div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>2</div>
                        <div className={styles.stepIcon} style={{background:'rgba(249,115,22,0.1)', color:'#f97316'}}>
                            <Mail size={28} />
                        </div>
                        <h3>Contactez l'étudiant</h3>
                        <p>Envoyez un message sécurisé sans exposer vos coordonnées personnelles.</p>
                    </div>
                    <div className={styles.stepLine}></div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>3</div>
                        <div className={styles.stepIcon} style={{background:'rgba(16,185,129,0.1)', color:'#10b981'}}>
                            <BookMarked size={28} />
                        </div>
                        <h3>Récupérez votre manuel</h3>
                        <p>Organisez la remise en main propre dans votre ville ou campus.</p>
                    </div>
                </div>
            </section>

            {/* =============== WHY US =============== */}
            <section className={styles.whySection}>
                <h2 className={styles.sectionTitle}>Pourquoi nous choisir ?</h2>
                <p className={styles.sectionSub}>Des avantages concrets pour votre vie étudiante</p>

                <div className={styles.features}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon} style={{background:'#f59e0b'}}>
                            <DollarSign size={28} color="white" />
                        </div>
                        <h3>Économie</h3>
                        <p>Achetez vos manuels jusqu'à 70% moins cher que le prix neuf. Vos prédécesseurs ont déjà fait le travail pour vous.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon} style={{background:'#10b981'}}>
                            <Leaf size={28} color="white" />
                        </div>
                        <h3>Écologie</h3>
                        <p>Chaque livre réutilisé, c'est du papier sauvé. Participez à l'économie circulaire au sein de votre campus.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon} style={{background:'#3b82f6'}}>
                            <Zap size={28} color="white" />
                        </div>
                        <h3>Simplicité</h3>
                        <p>Publiez une annonce en 30 secondes. Pas de frais d'envoi, pas de commissions. Contact direct entre étudiants.</p>
                    </div>
                </div>
            </section>

            {/* =============== CATALOGUE TEASER =============== */}
            <section id="catalogue" className={styles.catalogueSection}>
                <div className={styles.catalogueHeader}>
                    <div>
                        <h2 className={styles.sectionTitle} style={{textAlign:'left'}}>Dernières annonces</h2>
                        <p className={styles.sectionSub} style={{textAlign:'left'}}>Découvrez les manuels récemment publiés par la communauté</p>
                    </div>
                    <button className={styles.seeAllBtn} onClick={() => setShowModal(true)}>
                        Voir tout le catalogue <ChevronRight size={18} />
                    </button>
                </div>

                <div className={styles.teaserGrid}>
                    {TEASER_ANNONCES.map(a => (
                        <div key={a.id} className={styles.teaserCard} onClick={() => setShowModal(true)}>
                            <div className={styles.teaserImgWrap}>
                                <img src={a.photo} alt={a.titre} className={styles.teaserImg} />
                                <div className={styles.teaserRibbon} style={{background: TYPE_COLORS[a.type]}}>
                                    {TYPE_LABELS[a.type]}
                                </div>
                                <div className={styles.teaserEtat} style={{background: ETAT_COLORS[a.etat]}}>
                                    {a.etat}
                                </div>
                                {a.nbVues >= 150 && <div className={styles.teaserPopular}>🔥 Populaire</div>}
                                <div className={styles.teaserPrice} style={a.type === 'DON' ? {background:'#10b981'} : {}}>
                                    {a.type === 'VENTE' ? `${a.prix} DH` : a.type === 'DON' ? 'Gratuit' : 'Prêt'}
                                </div>
                            </div>
                            <div className={styles.teaserBody}>
                                <h3>{a.titre}</h3>
                                <p className={styles.teaserAuthor}>{a.auteur}</p>
                                <div className={styles.teaserMeta}>
                                    <span><MapPin size={13} /> {a.ville}</span>
                                    <span><Eye size={13} /> {a.nbVues}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Blur overlay CTA */}
                <div className={styles.teaserOverlay}>
                    <div className={styles.teaserOverlayContent}>
                        <h3>Envie de voir plus de manuels ?</h3>
                        <p>Créez un compte gratuit pour accéder à tout le catalogue et contacter les annonceurs.</p>
                        <button className={styles.teaserOverlayBtn} onClick={() => navigate('/login')}>
                            S'inscrire gratuitement <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* =============== STATS =============== */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    {STATS.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} className={styles.statCard}>
                                <Icon size={24} />
                                <span className={styles.statValue}>{s.value}</span>
                                <span className={styles.statLabel}>{s.label}</span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* =============== CTA =============== */}
            <section className={styles.ctaSection}>
                <h2>Prêt à économiser sur vos études ?</h2>
                <p>Rejoignez des centaines d'étudiants qui échangent déjà leurs manuels.</p>
                <div className={styles.ctaButtons}>
                    <button className={styles.ctaPrimary} onClick={() => navigate('/login')}>
                        Créer mon compte gratuitement <ArrowRight size={18} />
                    </button>
                    <button className={styles.ctaSecondary} onClick={() => scrollTo('how')}>
                        En savoir plus
                    </button>
                </div>
            </section>

            {/* =============== FOOTER =============== */}
            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <div className={styles.footerBrand}>
                        <div className={styles.navLogo}>
                            <div className={styles.navLogoIcon}><BookOpen size={18} /></div>
                            <span>BourseManuels</span>
                        </div>
                        <p>Plateforme d'échange de manuels universitaires entre étudiants marocains.</p>
                    </div>
                    <div className={styles.footerLinks}>
                        <h4>Plateforme</h4>
                        <a href="#">Comment ça marche</a>
                        <a href="#">Catalogue</a>
                        <a href="#">Contact</a>
                    </div>
                    <div className={styles.footerLinks}>
                        <h4>Légal</h4>
                        <a href="#">Conditions d'utilisation</a>
                        <a href="#">Politique de confidentialité</a>
                        <a href="#">Mentions légales</a>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <span>© 2026 BourseManuels — Projet de Fin d'Études</span>
                </div>
            </footer>

            {/* =============== MODAL =============== */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalIcon}>
                            <Heart size={32} />
                        </div>
                        <h3>Connectez-vous pour continuer</h3>
                        <p>Créez un compte gratuit pour accéder au catalogue complet, contacter les annonceurs et publier vos propres manuels.</p>
                        <div className={styles.modalActions}>
                            <button className={styles.modalPrimary} onClick={() => navigate('/login')}>
                                Créer un compte <ArrowRight size={16} />
                            </button>
                            <button className={styles.modalSecondary} onClick={() => setShowModal(false)}>
                                Plus tard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
