import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
    BookOpen, Search, ArrowRight, DollarSign, Leaf,
    Users, BookMarked, TrendingUp, Heart, MapPin, Eye,
    ChevronRight, Mail, Sun, Moon, Star, Quote, ShieldCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import BookInLogo from '../../components/common/BookInLogo';
import styles from './LandingPage.module.css';

// ============================
// MOCK DATA
// ============================
const TEASER_BOOKS = [
    { id: 1, titre: "Algorithmes et Structures", auteur: "Thomas H. Cormen", type: "VENTE", prix: 150, etat: "NEUF", nbVues: 230, ville: "Fès", photo: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop" },
    { id: 2, titre: "Droit Civil", auteur: "Jean Carbonnier", type: "DON", prix: null, etat: "BON", nbVues: 45, ville: "Casablanca", photo: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop" },
    { id: 3, titre: "Macroéconomie", auteur: "Gregory Mankiw", type: "PRET", prix: null, etat: "BON", nbVues: 180, ville: "Rabat", photo: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop" },
];

const TYPE_COLORS = { VENTE: '#FF5722', PRET: '#3B82F6', DON: '#10B981' };
const TYPE_LABELS = { VENTE: 'Vente', PRET: 'Prêt', DON: 'Don' };

const TESTIMONIALS = [
    { name: "Salma B.", filiere: "Droit · Casablanca", text: "J'ai trouvé mon Code Civil en 5 minutes. Incroyable !", avatar: "S", color: "#FF5722" },
    { name: "Youssef K.", filiere: "Informatique · Fès", text: "J'ai donné 8 manuels. La plateforme est super fluide.", avatar: "Y", color: "#3B82F6" },
    { name: "Amina R.", filiere: "Économie · Rabat", text: "Le prêt entre étudiants, c'est génial. Très économique.", avatar: "A", color: "#10B981" },
];

// ============================
// ANIMATED COUNTER
// ============================
function AnimatedCounter({ target, suffix = '' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const num = parseInt(target.replace(/[^0-9]/g, ''));
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) { setCount(num); clearInterval(timer); }
            else setCount(Math.floor(current));
        }, 1800 / steps);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ============================
// REVEAL WRAPPER
// ============================
function Reveal({ children, delay = 0, direction = 'up' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    
    const variants = {
        hidden: { opacity: 0, y: direction === 'up' ? 40 : 0, x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0 },
        visible: { opacity: 1, y: 0, x: 0 }
    };

    return (
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {children}
        </motion.div>
    );
}

// ============================
// LANDING PAGE
// ============================
export default function LandingPage() {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const [showModal, setShowModal] = useState(false);

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div className={`${styles.page} ${isDarkMode ? styles.dark : styles.light}`}>

            {/* =============== NAVBAR =============== */}
            <nav className={styles.navbar}>
                <div className={styles.navInner}>
                    <div className={styles.navLogo} onClick={() => scrollTo('hero')}>
                        <BookInLogo size={22} />
                    </div>
                    <div className={styles.navLinks}>
                        <button onClick={() => scrollTo('process')}>Comment ça marche</button>
                        <button onClick={() => scrollTo('books')}>Catalogue</button>
                        <button onClick={() => scrollTo('proof')}>Témoignages</button>
                    </div>
                    <div className={styles.navActions}>
                        <button className={styles.themeToggle} onClick={toggleTheme}>
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button className={styles.navLogin} onClick={() => navigate('/login')}>Connexion</button>
                        <button className={styles.navSignup} onClick={() => navigate('/register')}>CRÉER UN COMPTE</button>
                    </div>
                </div>
            </nav>

            {/* =============== HERO VIBE (SCHOLAR EDUCATION STYLE) =============== */}
            <section className={styles.hero}>
                {/* Organic curved background separator */}
                <div className={styles.heroBgCurve}>
                    <svg viewBox="0 0 1440 800" preserveAspectRatio="none">
                        <path d="M0,0 C400,0 600,800 1440,800 L1440,0 Z" fill="var(--hero-bg-curve)" />
                    </svg>
                </div>

                <div className={styles.heroContainer}>
                    {/* Left Column - Stark Typography & CTA */}
                    <div className={styles.heroLeft}>
                        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <h1 className={styles.heroTitle}>
                                BOOK-IN<br/>
                                <span>qualité et innovation</span>
                            </h1>
                            <p className={styles.heroSub}>
                                La plateforme nouvelle génération pour acheter, prêter et offrir vos manuels universitaires. Zéro intermédiaire, zéro frais cachés.
                            </p>

                            {/* Search Bar stylized */}
                            <div className={styles.heroSearch}>
                                <Search size={20} className={styles.heroSearchIcon} />
                                <input type="text" placeholder="Rechercher un manuel, ISBN..." className={styles.heroSearchInput} onFocus={() => setShowModal(true)} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Organic Vector Illustration */}
                    <div className={styles.heroRight}>
                        <motion.div className={styles.illustrationWrapper}
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                            
                            {/* Geometric Abstract Shapes */}
                            <motion.div className={styles.shapeYellowCircle} animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
                            <motion.div className={styles.shapeBlueWave} animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
                            <motion.div className={styles.shapeTriangle} animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
                            <motion.div className={styles.shapeOrangeAccent} animate={{ x: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
                            
                            {/* Main flat vector character built with inline SVG: Two students exchanging a book */}
                            <svg className={styles.vectorCharacter} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Student 1 (Left) */}
                                <path d="M180 320 C 180 320 150 200 120 200 C 80 200 60 220 60 280 C 60 330 90 370 140 370 Z" fill="#3B82F6" />
                                <path d="M100 370 L 80 480" stroke="#1E293B" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M140 340 L 140 460" stroke="#0F172A" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="120" cy="140" r="35" fill="#FFC9A9" />
                                <path d="M140 100 C 100 80 80 120 90 150 C 70 140 90 100 140 100 Z" fill="#0F172A" />
                                <path d="M140 230 L 220 260" stroke="#FFC9A9" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />

                                {/* Student 2 (Right) */}
                                <path d="M320 320 C 320 320 350 200 380 200 C 420 200 440 220 440 280 C 440 330 410 370 360 370 Z" fill="#10B981" />
                                <path d="M400 370 L 420 480" stroke="#1E293B" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M360 340 L 360 460" stroke="#0F172A" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="380" cy="140" r="35" fill="#FDBA74" />
                                <path d="M380 105 C 420 105 430 140 400 160 C 420 150 410 110 380 105 Z" fill="#78350F" />
                                <path d="M360 230 L 280 270" stroke="#FDBA74" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />

                                {/* The Book being exchanged */}
                                <path d="M220 240 L 260 230 L 280 260 L 240 270 Z" fill="#FF5722" />
                                <path d="M215 245 L 255 235 L 275 265 L 235 275 Z" fill="#FFFFFF" opacity="0.3" />
                            </svg>

                        </motion.div>
                    </div>
                </div>
            </section>

            {/* =============== PROCESS BENTO BOXES (PASTEL LIGHT) =============== */}
            <section id="process" className={styles.processSection}>
                <div className={styles.steps}>
                    {[
                        { num: '01', icon: Search, title: 'Recherchez', desc: 'Trouvez facilement par filière ou ISBN.', color: '#2563EB', bg: '#EFF6FF' },
                        { num: '02', icon: Mail, title: 'Connectez', desc: 'Prenez contact de façon sécurisée.', color: '#EA580C', bg: '#FFF7ED' },
                        { num: '03', icon: BookMarked, title: 'Échangez', desc: 'Donnez une seconde vie aux manuels.', color: '#059669', bg: '#ECFDF5' },
                    ].map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <Reveal key={i} delay={i * 0.15}>
                                <div className={styles.stepCard} style={{ background: step.bg, borderColor: step.bg }}>
                                    <div className={styles.stepIcon} style={{ background: 'white', color: step.color, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                        <Icon size={24} />
                                    </div>
                                    <h3 style={{ color: '#0F172A' }}>{step.title}</h3>
                                    <p style={{ color: '#475569' }}>{step.desc}</p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* =============== FEATURED BOOKS =============== */}
            <section id="books" className={styles.booksSection}>
                <Reveal>
                    <div className={styles.booksSectionHeader}>
                        <h2 className={styles.sectionTitle}>Catalogue récent</h2>
                        <button className={styles.seeAllBtn} onClick={() => setShowModal(true)}>
                            Voir tout <ChevronRight size={18} />
                        </button>
                    </div>
                </Reveal>
                <div className={styles.booksGrid}>
                    {TEASER_BOOKS.map((b, i) => (
                        <Reveal key={b.id} delay={i * 0.08}>
                            <div className={styles.bookCard} onClick={() => setShowModal(true)}>
                                <div className={styles.bookImgWrap}>
                                    <img src={b.photo} alt={b.titre} className={styles.bookImg} loading="lazy" />
                                    <div className={styles.bookRibbon} style={{ background: TYPE_COLORS[b.type] }}>{TYPE_LABELS[b.type]}</div>
                                </div>
                                <div className={styles.bookBody}>
                                    <h3>{b.titre}</h3>
                                    <p className={styles.bookAuthor}>{b.auteur}</p>
                                    <div className={styles.bookMeta}>
                                        <span><MapPin size={13} /> {b.ville}</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* =============== SOCIAL PROOF =============== */}
            <section id="proof" className={styles.proofSection}>
                <div className={styles.statsBar}>
                    {[
                        { value: '450', suffix: '+', label: 'Manuels dispo', icon: BookMarked },
                        { value: '120', suffix: '+', label: 'Échanges réussis', icon: TrendingUp },
                        { value: '35000', suffix: ' DH', label: 'Économisés', icon: DollarSign },
                        { value: '300', suffix: '+', label: 'Étudiants', icon: Users },
                    ].map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className={styles.statItem}>
                                    <Icon size={22} className={styles.statIcon} />
                                    <span className={styles.statValue}><AnimatedCounter target={s.value} suffix={s.suffix} /></span>
                                    <span className={styles.statLabel}>{s.label}</span>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                <Reveal>
                    <div className={styles.sectionHeaderCentered} style={{ textAlign: 'center', marginTop: '5rem', marginBottom: '3rem' }}>
                        <h2 className={styles.sectionTitle}>Ils l'utilisent</h2>
                        <div className={styles.titleUnderline} style={{ width: '60px', height: '4px', background: 'var(--accent-color)', margin: '1rem auto' }}></div>
                    </div>
                </Reveal>
                <div className={styles.testimonials}>
                    {TESTIMONIALS.map((t, i) => (
                        <Reveal key={i} delay={0.1 + i * 0.12}>
                            <div className={styles.testimonialCard}>
                                <Quote size={24} className={styles.quoteIcon} />
                                <p className={styles.testimonialText}>{t.text}</p>
                                <div className={styles.testimonialAuthor}>
                                    <div className={styles.testimonialAvatar} style={{ background: t.color }}>{t.avatar}</div>
                                    <div>
                                        <strong>{t.name}</strong>
                                        <span>{t.filiere}</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* =============== CTA FINAL =============== */}
            <section className={styles.ctaFinal}>
                <Reveal>
                    <div className={styles.ctaFinalCard}>
                        <div className={styles.ctaFinalContent}>
                            <h2>Prêt à révolutionner vos études ?</h2>
                            <p>Rejoignez des centaines d'étudiants qui échangent déjà leurs manuels. Gratuit, rapide et solidaire.</p>
                            <div className={styles.ctaButtons}>
                                <button className={styles.ctaPrimary} onClick={() => navigate('/register')}>
                                    Créer mon compte <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.ctaFinalGraphic}>
                            <ShieldCheck size={180} className={styles.ctaFinalIcon} />
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* =============== FOOTER =============== */}
            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <div className={styles.footerBrand}>
                        <BookInLogo size={20} />
                        <p>L'économie circulaire au service de l'éducation.</p>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <span>© 2026 BOOK-IN</span>
                </div>
            </footer>

            {/* =============== MODAL =============== */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <motion.div className={styles.modalBox} onClick={e => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className={styles.modalIcon}><Heart size={32} /></div>
                        <h3>Rejoignez la communauté</h3>
                        <p>Créez un profil pour rechercher librement, contacter les vendeurs et publier vos manuels.</p>
                        <div className={styles.modalActions}>
                            <button className={styles.modalPrimary} onClick={() => navigate('/register')}>
                                Créer mon compte <ArrowRight size={16} />
                            </button>
                            <button className={styles.modalSecondary} onClick={() => setShowModal(false)}>Continuer la visite</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
