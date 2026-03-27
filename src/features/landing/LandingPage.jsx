import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Search, ArrowRight, DollarSign, Leaf,
    Users, BookMarked, TrendingUp, Heart, MapPin, Eye,
    ChevronLeft, ChevronRight, Mail, Sun, Moon, Star, Quote, ShieldCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import BookInLogo from '../../components/common/BookInLogo';
import styles from './LandingPage.module.css';
import livresIllustration from '../../assets/LIVRES.png';


// ============================
// MOCK DATA
// ============================
const TEASER_BOOKS = [
    { id: 1, titre: "Introduction aux Algorithmes", auteur: "Thomas H. Cormen", type: "VENTE", prix: 180, etat: "Très bon", nbVues: 230, ville: "Fès", photo: "/admin/assets/books/cormen_new.png" },
    { id: 2, titre: "Macroéconomie", auteur: "N. Gregory Mankiw", type: "VENTE", prix: 120, etat: "Bon", nbVues: 145, ville: "Casablanca", photo: "/admin/assets/books/mankiw_new.png" },
    { id: 3, titre: "Biologie", auteur: "Campbell & Reece", type: "DON", prix: null, etat: "Bon", nbVues: 180, ville: "Rabat", photo: "/admin/assets/books/biologie_campbell.png" },
    { id: 4, titre: "Physique Quantique", auteur: "Claude Cohen-Tannoudji", type: "VENTE", prix: 200, etat: "Neuf", nbVues: 120, ville: "Marrakech", photo: "/admin/assets/books/physique_quantique.png" },
    { id: 5, titre: "Analyse Mathématique", auteur: "Walter Rudin", type: "PRET", prix: null, etat: "Très bon", nbVues: 95, ville: "Tanger", photo: "/admin/assets/books/algo_cormen.png" },
];

const TYPE_COLORS = { VENTE: '#FF5722', PRET: '#3B82F6', DON: '#10B981' };
const TYPE_LABELS = { VENTE: 'Vente', PRET: 'Prêt', DON: 'Don' };

const TESTIMONIALS = [
    { name: "Salma B.", filiere: "Droit · Casablanca", text: "5 min chrono pour trouver mon Code Civil. Je recommande à 100% !", avatar: "S", color: "#FF5722" },
    { name: "Youssef K.", filiere: "Info · Fès", text: "J'ai filé 8 bouquins qui prenaient la poussière. Trop simple.", avatar: "Y", color: "#3B82F6" },
    { name: "Amina R.", filiere: "Éco · Rabat", text: "Grâce au prêt, j'ai économisé 400 DH ce semestre. Merci !", avatar: "A", color: "#10B981" },
];

const SLIDES = [
    {
        bg: "#128568",
        textColor: "#1A0F2E",
        titleParts: ["Tes manuels,", "à portée de clic", ""],
        highlightBg: "transparent",
        highlightColor: "#FF5722",
        highlightRotate: "0deg",
        highlightFont: "'Caveat', cursive",
        subtitle: "Vendez, achetez ou échangez vos livres de cours entre étudiants marocains. C'est gratuit et en 2 clics.",
        cta: "Vendre mes livres",
        ctaBg: "#1A0F2E",
        ctaColor: "#FFFFFF",
        heroImage: null,
        heroImageAlt: ""
    },
    {
        bg: "linear-gradient(135deg, #32115B 0%, #4C1D95 50%, #5B21B6 100%)",
        textColor: "#FFFFFF",
        titleParts: ["Économisez jusqu'à", "-70% sur vos manuels", ""],
        highlightBg: "transparent",
        highlightColor: "#FDE047",
        highlightRotate: "-1deg",
        highlightFont: "'Caveat', cursive",
        subtitle: "Des centaines de manuels universitaires d'occasion vérifiés. De Casablanca à Fès, la réussite sans se ruiner.",
        cta: "Explorer le catalogue",
        ctaBg: "#D4AF37",
        ctaColor: "#32115B",
        heroImage: null,
        heroImageAlt: ""
    },
    {
        bg: "linear-gradient(135deg, #FFCCEA 0%, #F9A8D4 50%, #F472B6 100%)",
        textColor: "#311024",
        titleParts: ["En panne", "d'inspiration ?", ""],
        highlightBg: "transparent",
        highlightColor: "#7C3AED",
        highlightRotate: "-3deg",
        highlightFont: "'Caveat', cursive",
        subtitle: "Consultez notre catalogue intelligent. Trouvez votre prochain manuel par filière, ville ou ISBN.",
        cta: "Découvrir le catalogue",
        ctaBg: "#7C3AED",
        ctaColor: "#FFFFFF",
        heroImage: null,
        heroImageAlt: ""
    },
    {
        bg: "linear-gradient(135deg, #183B25 0%, #166534 50%, #15803D 100%)",
        textColor: "#FFFFFF",
        titleParts: ["Top Ventes 2026 :", "Les Indispensables", ""],
        highlightBg: "transparent",
        highlightColor: "#FCD34D",
        highlightRotate: "-2deg",
        highlightFont: "'Caveat', cursive",
        subtitle: "La sélection validée par les profs et les anciens lauréats. Cormen, Mankiw, Campbell... Foncez !",
        cta: "Voir la sélection",
        ctaBg: "#D4AF37",
        ctaColor: "#183B25",
        heroImage: null,
        heroImageAlt: ""
    }
];

/* Decorative SVG accents rendered per-slide */
const SlideDecoration = ({ slideIndex }) => {
    const decos = [
        // Slide 0: purple — stars + swoosh
        <>
            <span style={{ position: 'absolute', top: '12%', left: '48%', fontSize: '32px', opacity: 0.25, color: '#1A0F2E' }}>✦</span>
            <span style={{ position: 'absolute', bottom: '18%', left: '42%', fontSize: '22px', opacity: 0.2, color: '#1A0F2E', transform: 'rotate(-30deg)' }}>⤻</span>
            <span style={{ position: 'absolute', top: '70%', left: '52%', fontSize: '18px', opacity: 0.15, color: '#1A0F2E' }}>✧</span>
        </>,
        // Slide 1: deep purple — gold sparkles
        <>
            <span style={{ position: 'absolute', top: '8%', left: '12%', fontSize: '26px', opacity: 0.4, color: '#FDE047' }}>✴</span>
            <span style={{ position: 'absolute', bottom: '22%', left: '38%', fontSize: '36px', opacity: 0.25, color: '#FDE047', transform: 'rotate(-15deg)' }}>✦</span>
            <span style={{ position: 'absolute', top: '55%', left: '50%', fontSize: '20px', opacity: 0.3, color: '#FDE047' }}>✧</span>
        </>,
        // Slide 2: pink — flowers + birds
        <>
            <span style={{ position: 'absolute', top: '10%', left: '55%', fontSize: '28px', opacity: 0.2, color: '#7C3AED' }}>❀</span>
            <span style={{ position: 'absolute', bottom: '25%', left: '32%', fontSize: '34px', opacity: 0.15, color: '#311024' }}>✿</span>
            <span style={{ position: 'absolute', top: '65%', left: '48%', fontSize: '20px', opacity: 0.2, color: '#7C3AED' }}>🕊</span>
        </>,
        // Slide 3: green — gold stars   
        <>
            <span style={{ position: 'absolute', top: '15%', left: '50%', fontSize: '30px', opacity: 0.3, color: '#FCD34D' }}>✦</span>
            <span style={{ position: 'absolute', bottom: '30%', left: '35%', fontSize: '22px', opacity: 0.4, color: '#FCD34D' }}>✧</span>
            <span style={{ position: 'absolute', top: '60%', left: '55%', fontSize: '16px', opacity: 0.25, color: '#FCD34D' }}>★</span>
        </>
    ];
    return decos[slideIndex] || null;
};

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
    const [slide, setSlide] = useState(0);
    const handlePrev = () => {
        setSlide(s => (s === 0 ? SLIDES.length - 1 : s - 1));
    };

    const handleNext = () => {
        setSlide(s => (s === SLIDES.length - 1 ? 0 : s + 1));
    };

    const currentSlideData = SLIDES[slide];
    const cursorRef = useRef(null);

    // Auto-play Carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setSlide((prev) => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

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

            {/* =============== PROMO BAR =============== */}
            <div className={styles.promoBar}>
                <span>LIVRAISON OFFERTE DÈS 25€ DE LIVRES D'OCCASION —— <strong>TROUVE TON MANUEL EN 2 MIN</strong></span>
            </div>

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
                    <div className={styles.navSearch}>
                        <Search size={16} className={styles.navSearchIcon} />
                        <input type="text" placeholder="Rechercher par titre, auteur ou ISBN..." className={styles.navSearchInput} />
                    </div>
                    <div className={styles.navActions}>
                        <button id="theme-toggle" className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button id="nav-login" className={styles.navLogin} onClick={() => navigate('/login')}>Connexion</button>
                        <button id="nav-signup" className={styles.navSignup} onClick={() => navigate('/register')}>CRÉER UN COMPTE</button>
                    </div>
                </div>
            </nav>

            {/* =============== NEW CAROUSEEL HERO (MARKETPLACE STYLE) =============== */}
            <section id="hero" className={styles.heroCarousel}>
                <div className={styles.carouselWrapper}>
                    <button className={styles.navArrowPrev} onClick={handlePrev} aria-label="Slide Précédente">
                        <ChevronLeft size={24} />
                    </button>

                    <div
                        className={styles.heroBanner}
                        style={{ background: currentSlideData.bg }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className={styles.bannerContent}
                            >
                                <SlideDecoration slideIndex={slide} />

                                <div className={styles.bannerText}>
                                    <h2 className={styles.bannerTitle} style={{ color: currentSlideData.textColor }}>
                                        {currentSlideData.titleParts[0]}
                                        <br />
                                        <span className={styles.bannerHighlight} style={{
                                            background: currentSlideData.highlightBg,
                                            color: currentSlideData.highlightColor,
                                            transform: `rotate(${currentSlideData.highlightRotate})`,
                                            fontFamily: currentSlideData.highlightFont
                                        }}>
                                            {currentSlideData.titleParts[1]}
                                        </span>
                                        {currentSlideData.titleParts[2] && <><br />{currentSlideData.titleParts[2]}</>}
                                    </h2>
                                    <p className={styles.bannerSubtitle} style={{ color: currentSlideData.textColor, opacity: 0.85 }}>
                                        {currentSlideData.subtitle}
                                    </p>
                                    <button
                                        className={styles.bannerCta}
                                        onClick={() => navigate('/register')}
                                        style={{ background: currentSlideData.ctaBg, color: currentSlideData.ctaColor }}
                                    >
                                        {currentSlideData.cta}
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                                {/* Photographic Visual for the first slide */}
                                <div className={styles.bannerHeroVisual}>
                                    {slide === 0 && (
                                        <>
                                            <div className={styles.occasionBadge}>
                                                <span className={styles.occasionText}>d'occasion</span>
                                                <svg className={styles.occasionArrow} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20,20 C40,10 70,30 50,60 C30,90 80,90 90,80" stroke="#1A0F2E" strokeWidth="3" fill="none" strokeDasharray="0" />
                                                    <path d="M85,75 L95,85 L80,90" stroke="#1A0F2E" strokeWidth="3" fill="none" />
                                                </svg>
                                            </div>

                                            <div className={styles.discountBadge}>
                                                <svg className={styles.sketchCircle} viewBox="0 0 100 100">
                                                    <path d="M50,10 C20,10 10,40 10,60 C10,85 40,95 70,85 C95,75 95,30 70,15 C60,10 40,10 30,15" stroke="#FF5722" strokeWidth="3" fill="none" />
                                                </svg>
                                                <span className={styles.discountValue}>-70%</span>
                                                <span className={styles.discountLabel}>du prix initial</span>
                                            </div>

                                            <div className={styles.moinscherLabel}>
                                                <span>moins cher</span>
                                                <svg className={styles.squigglyLine} viewBox="0 0 100 20">
                                                    <path d="M5,15 Q25,5 50,15 T95,15" stroke="#3B82F6" strokeWidth="2" fill="none" />
                                                </svg>
                                            </div>

                                            <div className={styles.premiumStamp}>
                                                <svg viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#EA580C" strokeWidth="2" strokeDasharray="5,3" />
                                                    <text x="50" y="45" textAnchor="middle" fontSize="10" fill="#EA580C" fontWeight="bold">SATISFAIT</text>
                                                    <text x="50" y="60" textAnchor="middle" fontSize="10" fill="#EA580C" fontWeight="bold">OU ÉCHANGÉ</text>
                                                </svg>
                                            </div>

                                            <div className={styles.floatingIconPen}>🖋️</div>
                                            <img
                                                src={livresIllustration}
                                                alt="Main tenant une pile de manuels scolaires français d'occasion"
                                                className={styles.realBooksImage}
                                            />
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Pagination Pill */}
                        <div className={styles.paginationPill}>
                            {SLIDES.map((_, index) => (
                                <div
                                    key={index}
                                    className={`${styles.pDot} ${slide === index ? styles.pDotActive : ''}`}
                                    onClick={() => setSlide(index)}
                                />
                            ))}
                        </div>
                    </div>

                    <button className={styles.navArrowNext} onClick={handleNext} aria-label="Slide Suivante">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </section>

            {/* =============== BEST SELLERS (IMAGE 8 STYLE) =============== */}
            <section className={styles.bestSellers}>
                <div className={styles.bestSellersInner}>
                    <div className={styles.bestSellersMenu}>
                        <div className={styles.bestSellersMenuTitle}>
                            <h3>Meilleures Ventes</h3>
                        </div>
                    </div>
                    <div className={styles.bestSellersGrid}>
                        {TEASER_BOOKS.map((b, i) => (
                            <div key={b.id} className={styles.bestBookCard} onClick={() => setShowModal(true)}>
                                <div className={styles.bestBookImgWrap}>
                                    <img src={b.photo} alt={b.titre} loading="lazy" />
                                    <div className={styles.bestBookLabel} style={{ background: TYPE_COLORS[b.type] }}>{TYPE_LABELS[b.type]}</div>
                                    {b.etat && <div className={styles.bestBookEtat}>{b.etat}</div>}
                                </div>
                                <div className={styles.bestBookInfo}>
                                    <h4>{b.titre}</h4>
                                    <p className={styles.bestBookAuthor}>{b.auteur}</p>
                                    <div className={styles.bestBookPrice}>
                                        {b.prix ? <span className={styles.priceTag}>{b.prix} DH</span> : <span className={styles.freeTag}>Gratuit</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
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
