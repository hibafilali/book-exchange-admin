import { useState, useEffect, useRef, useCallback } from 'react';
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
    { name: "Salma B.", filiere: "Droit · Casablanca", text: "5 min chrono pour trouver mon Code Civil. Je recommande à 100% !", avatar: "S", color: "#FF5722" },
    { name: "Youssef K.", filiere: "Info · Fès", text: "J'ai filé 8 bouquins qui prenaient la poussière. Trop simple.", avatar: "Y", color: "#3B82F6" },
    { name: "Amina R.", filiere: "Éco · Rabat", text: "Grâce au prêt, j'ai économisé 400 DH ce semestre. Merci !", avatar: "A", color: "#10B981" },
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
        hidden: { opacity: 0, y: direction === 'up' ? 30 : 0, x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0 },
        visible: { opacity: 1, y: 0, x: 0 }
    };

    return (
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay }}>
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
    const cursorRef = useRef(null);

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    // Custom cursor with lag
    useEffect(() => {
        const move = (e) => {
            if (cursorRef.current) {
                requestAnimationFrame(() => {
                    cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
                });
            }
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    // Slight random rotations for book cards
    const cardRotations = useRef([0.8, -1.2, 0.6]).current;

    return (
        <div className={`${styles.page} ${isDarkMode ? styles.dark : styles.light}`}>
            {/* Custom cursor */}
            <div ref={cursorRef} className={styles.customCursor} />
            {/* Noise texture overlay */}
            <div className={styles.noiseOverlay} />

            {/* =============== NAVBAR =============== */}
            <nav className={styles.navbar}>
                <div className={styles.navInner}>
                    <div className={styles.navLogo} onClick={() => scrollTo('hero')}>
                        <BookInLogo size={18} />
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

            {/* =============== HERO SECTION (SCHOLAR EDUCATION CLONE) =============== */}
            <section id="hero" className={styles.hero}>
                {/* Scholar Organic Background System */}
                <div className={styles.heroBgCurve}>
                    <svg viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Large Organic Swoop (Left) */}
                        <path d="M0 0 H 800 Q 1000 400 800 800 H 0 V 0Z" fill={isDarkMode ? "var(--bg-secondary)" : "#FFFFFF"} style={{ transition: 'fill 0.4s ease' }} />
                        {/* Blue Bottom Wave */}
                        <path d="M0 720 Q 400 650 800 720 T 1440 700 V 800 H 0 V 720Z" fill="#1E40AF" />
                    </svg>
                </div>

                <div className={styles.heroContainer}>
                    {/* Left Column - Scholar Style Typography */}
                    <div className={styles.heroLeft}>
                        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                            <h1 className={styles.heroTitle}>
                                BOOK-IN<br />
                                <span>Votre savoir a de la valeur.</span>
                            </h1>
                            <h2 className={styles.heroH2}>Vends, prête ou offre tes manuels au Maroc.</h2>
                            <p className={styles.heroSub}>
                                Rejoignez la plus grande communauté d'échange de manuels au Maroc. Vends, prête ou offre tes livres à d'autres étudiants, sans intermédiaire.
                            </p>

                            <button className={styles.heroCta} onClick={() => navigate('/register')}>CRÉER UN COMPTE</button>

                            {/* Search Bar stylized */}
                            <div className={styles.heroSearch}>
                                <Search size={18} className={styles.heroSearchIcon} />
                                <input type="text" placeholder="Quel manuel cherches-tu ?" className={styles.heroSearchInput} onFocus={() => setShowModal(true)} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Scholar Style Illustration (Dual Student Exchange) */}
                    <div className={styles.heroRight}>
                        <div className={styles.illustrationWrapper}>
                            {/* Scholar Yellow Circle Background */}
                            <div className={styles.shapeGoldCircle} />

                            {/* Scholar Geometric Ornaments */}
                            <div className={styles.shapeSmallTriangle} />
                            <div className={styles.shapeMutedOrange} />

                            <svg className={styles.vectorCharacter} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                                        <feOffset dx="0" dy="5" result="offsetblur" />
                                        <feComponentTransfer><feFuncA type="linear" slope="0.1" /></feComponentTransfer>
                                        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                                    </filter>
                                </defs>

                                {/* Student 1 (Left) - Vivid Blue + Glasses */}
                                <motion.g id="student-left" animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                                    <circle cx="150" cy="180" r="30" fill="#FFC9A9" />
                                    <path d="M120 160 Q 150 145 180 160" stroke="#1E293B" strokeWidth="15" strokeLinecap="round" />
                                    <circle cx="140" cy="180" r="8" stroke="#1E293B" strokeWidth="2" fill="white" />
                                    <circle cx="160" cy="180" r="8" stroke="#1E293B" strokeWidth="2" fill="white" />
                                    <path d="M148 180 H 152" stroke="#1E293B" strokeWidth="1" />

                                    <path d="M110 420 Q 150 430 190 420 L 180 240 Q 150 225 120 240 Z" fill={isDarkMode ? "#1E40AF" : "#3B82F6"} filter="url(#shadow)" />
                                    <path d="M110 420 L 190 420 L 185 460 L 115 460 Z" fill="#F1F5F9" />
                                    <path d="M175 300 C 210 300, 230 290, 250 275" stroke="#FFC9A9" strokeWidth="18" strokeLinecap="round" />
                                </motion.g>

                                {/* Student 2 (Right) - Emerald Green */}
                                <motion.g id="student-right" animate={{ y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                                    <circle cx="350" cy="180" r="30" fill="#FFC9A9" />
                                    <path d="M320 160 Q 350 145 380 160" stroke={isDarkMode ? "#065F46" : "#10B981"} strokeWidth="15" strokeLinecap="round" />

                                    <path d="M310 420 Q 350 430 390 420 L 380 240 Q 350 225 320 240 Z" fill={isDarkMode ? "#065F46" : "#10B981"} filter="url(#shadow)" />
                                    <path d="M310 420 L 390 420 L 385 460 L 315 460 Z" fill="#F1F5F9" />
                                    <path d="M325 300 C 290 300, 270 290, 250 275" stroke="#FFC9A9" strokeWidth="18" strokeLinecap="round" />
                                </motion.g>

                                {/* THE EXCHANGE - STACK OF THREE BOOKS */}
                                <motion.g id="exchange-object" animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                                    {/* Bottom Book (Deep Emerald Green) */}
                                    <rect x="225" y="275" width="55" height="15" rx="2" fill="#065F46" transform="rotate(-5 225 275)" />
                                    <path d="M228 285 H 275" stroke="white" strokeWidth="1" strokeOpacity="0.2" transform="rotate(-5 225 275)" />

                                    {/* Middle Book (Sapphire Blue) */}
                                    <rect x="228" y="260" width="55" height="15" rx="2" fill="#1E40AF" transform="rotate(3 228 260)" />
                                    <path d="M231 270 H 278" stroke="white" strokeWidth="1" strokeOpacity="0.2" transform="rotate(3 228 260)" />

                                    {/* Top Book (Coral Orange #FF5722) */}
                                    <rect x="225" y="245" width="55" height="15" rx="2" fill="#FF5722" transform="rotate(-2 225 245)" />
                                    <path d="M228 255 h 45" stroke="white" strokeWidth="1" strokeOpacity="0.3" transform="rotate(-2 225 245)" />
                                </motion.g>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* =============== PROCESS BENTO BOXES (PASTEL LIGHT) =============== */}
            <section id="process" className={styles.processSection}>
                <div className={styles.steps}>
                    {[
                        { num: '01', icon: Search, title: 'Cherche', desc: 'Tape le nom, la filière ou l\'ISBN et c\'est parti.', color: '#2563EB', bg: '#EFF6FF' },
                        { num: '02', icon: Mail, title: 'Contacte', desc: 'Envoie un message au vendeur, fixez un RDV sur le campus.', color: '#EA580C', bg: '#FFF7ED' },
                        { num: '03', icon: BookMarked, title: 'Échange', desc: 'Récupère ton bouquin. Pas de frais de port, pas de stress.', color: '#059669', bg: '#ECFDF5' },
                    ].map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <Reveal key={i} delay={i * 0.15}>
                                <div className={styles.stepCard} style={{ background: step.bg, borderColor: step.bg, transform: `rotate(${i === 1 ? -0.5 : i === 2 ? 0.4 : 0}deg)` }}>
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
                        <h2 className={styles.sectionTitle}>Les petites dernières 📚</h2>
                        <button className={styles.seeAllBtn} onClick={() => setShowModal(true)}>
                            Voir tout <ChevronRight size={18} />
                        </button>
                    </div>
                </Reveal>
                <div className={styles.booksGrid}>
                    {TEASER_BOOKS.map((b, i) => (
                        <Reveal key={b.id} delay={i * 0.08}>
                            <div className={styles.bookCard} onClick={() => setShowModal(true)} style={{ transform: `rotate(${cardRotations[i]}deg)` }}>
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
                        <h2 className={styles.sectionTitle}>La parole aux étudiants 💬</h2>
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
                            <h2>T'attends quoi pour nous rejoindre ?</h2>
                            <p>Des centaines d'étudiants échangent déjà leurs bouquins. Gratuit, rapide, et entre nous.</p>
                            <div className={styles.ctaButtons}>
                                <button className={styles.ctaPrimary} onClick={() => navigate('/register')}>
                                    Je m'inscris <ArrowRight size={18} />
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
                        <p>Fait par des étudiants, pour des étudiants. ❤️</p>
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
                        <h3>Hey, crée-toi un compte d'abord 😉</h3>
                        <p>C'est gratuit, ça prend 30 secondes, et tu pourras chercher, contacter et publier librement.</p>
                        <div className={styles.modalActions}>
                            <button className={styles.modalPrimary} onClick={() => navigate('/register')}>
                                C'est parti ! <ArrowRight size={16} />
                            </button>
                            <button className={styles.modalSecondary} onClick={() => setShowModal(false)}>Je regarde encore un peu</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
