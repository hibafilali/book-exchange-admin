import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Search, ArrowRight, DollarSign, Leaf,
    Users, BookMarked, TrendingUp, Heart, MapPin, Eye,
    ChevronLeft, ChevronRight, Mail, Sun, Moon, Star, Quote, ShieldCheck,
    Stethoscope, GraduationCap, Gavel, Landmark, Languages
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import YTeraLogo from '../../components/common/YTeraLogo';
import styles from './LandingPage.module.css';
import livresIllustration from '../../assets/LIVRES.png';
import megaphoneWoman from '../../assets/megaphone-woman.png';
import heroMascot from '../../assets/hero-mascot.png';
import phoneIllustration from '../../assets/phone-illustration.png';
import thinkingWoman from '../../assets/thinking-woman-new.png';
import examCalendar from '../../assets/exam-calendar-drawing.png';
import thoughtBubble from '../../assets/thought-bubble-drawing.png';
import solidaireLabel from '../../assets/emprunt-solidaire-label.png';
import book1 from '../../assets/book1.png';
import book2 from '../../assets/book2.png';
import book3 from '../../assets/book3.png';
import book4 from '../../assets/book4.png';
import book5 from '../../assets/book5.png';




// ============================
// MOCK DATA
// ============================
const TEASER_BOOKS = [
    { id: 1, titre: "Engineering Chemistry", auteur: "K. Dinakaran & G. Sasikumar", type: "VENTE", prix: 180, etat: "Très bon", nbVues: 230, ville: "Fès", photo: book1 },
    { id: 2, titre: "Anatomie Humaine", auteur: "Dr. Salim Alaoui", type: "VENTE", prix: 250, etat: "Comme neuf", nbVues: 145, ville: "Casablanca", photo: book2 },
    { id: 3, titre: "Droit Civil : Les Obligations", auteur: "Prof. Yassir Benani", type: "DON", prix: null, etat: "Bon", nbVues: 180, ville: "Rabat", photo: book3 },
    { id: 4, titre: "Principes de Macroéconomie", auteur: "Dr. Amina El Fassi", type: "VENTE", prix: 150, etat: "Très bon", nbVues: 120, ville: "Marrakech", photo: book4 },
    { id: 5, titre: "Mathématiques pour Ingénieurs", auteur: "Prof. Kamal Ziani", type: "PRET", prix: null, etat: "Bon", nbVues: 95, ville: "Tanger", photo: book5 },
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
        bg: "#3B108E",
        textColor: "#FFFFFF",
        titleParts: ["ÉCHANGEZ VOS LIVRES", "Zéro Dirham, Réussite Totale", ""],
        highlightBg: "transparent",
        highlightColor: "#FACC15",
        highlightRotate: "0deg",
        highlightFont: "'Inter', sans-serif",
        subtitle: "N'attendez pas ! Rejoignez notre communauté d'étudiants. Boostez votre semestre en échangeant vos manuels usagés contre ceux qu'il vous faut, gratuitement !",
        cta: "Proposer un échange",
        ctaBg: "#FACC15",
        ctaColor: "#000000",
        heroImage: null,
        heroImageAlt: "",
        isFlipped: true
    },
    {
        bg: "#3A7C88",
        textColor: "#FFFFFF",
        titleColor: "#FFFFFF", /* Switched to White for much better readability */
        subtitleColor: "#f8fafc", /* Slate 50 */
        titleParts: ["EXAMENS PROCHES ?", "RÉVISEZ SANS VOUS RUINER !", ""],
        highlightBg: "transparent",
        highlightColor: "#FACC15", /* Bright yellow highlight */
        highlightRotate: "0deg",
        highlightFont: "'Inter', sans-serif",
        subtitle: "Solidarité étudiante : accédez à prix solidaire aux manuels de révision dont vous avez besoin.",
        cta: "Emprunter des manuels",
        ctaBg: "#2B1B41",
        ctaColor: "#FFFFFF",
        heroImage: null,
        heroImageAlt: "",
        isTealHero: true
    },
    {
        bg: "#801C1E",
        textColor: "#FFFFFF",
        titleParts: ["Ne laissez plus vos manuels", "prendre de la poussière", "sur l’étagère."],
        highlightBg: "transparent",
        highlightColor: "#FF5722",
        highlightRotate: "0deg",
        highlightFont: "'Inter', sans-serif",
        subtitle: "Achetez, Vendez, Échangez vos manuels d'occasion. Intégrez notre économie circulaire solidaire.",
        cta: "S'INSCRIRE GRATUITEMENT",
        ctaBg: "#FF5722",
        ctaColor: "#FFFFFF",
        heroImage: heroMascot,
        heroImageAlt: "Mascotte yTera",
        isFlipped: true,
        titleClass: styles.bannerTitleSlide3,
        textClass: styles.bannerTextSlide3,
        mascotClass: styles.mascotSlide3
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
        // Slide 1: deep purple — PARTAGE watermark + arrows
        <>
            <div className={styles.watermarkTroc}>PARTAGE</div>
            <div className={styles.watermarkArrows}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: 'white', opacity: 0.08 }}>
                    <path d="M21 2v6h-6" />
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                    <path d="M3 22v-6h6" />
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                </svg>
            </div>
        </>,
        // Slide 2: Teal — no deco needed, assets will be in visual
        null,
        // Slide 3: Red - Hand-Drawn Design Details
        <div className={styles.redSlideDecoration}>
            {/* Background Texture */}
            <div className={`${styles.dotGrid} ${styles.dotGridTopLeft}`} style={{ opacity: 0.12 }} />
            <div className={`${styles.dotGrid} ${styles.dotGridBottomRight}`} style={{ bottom: '10%', right: '5%', opacity: 0.12 }} />
            
            {/* Hand-Drawn Badge Circle - Now to the right of the Button */}
            <div className={styles.circularBadge} style={{ right: '5%', bottom: '8%', top: 'auto', left: 'auto' }}>
                <svg className={styles.sketchCircleDrawn} viewBox="0 0 100 100" style={{ transform: 'rotate(10deg)' }}>
                    <path d="M50,10 C30,12 10,30 12,55 C15,80 40,92 65,88 C90,82 95,55 88,30 C82,10 60,8 45,15" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
                </svg>
                <div className={styles.circularBadgeInner} style={{ fontSize: '0.65rem', lineHeight: 1.2 }}>
                    ÉCONOMIE<br/>SOLIDAIRE
                </div>
            </div>

            {/* Handwritten Keywords - Positioned AROUND the girl */}
            <span className={styles.handwrittenKeyword} style={{ top: '10%', left: '38%', fontSize: '1.8rem', transform: 'rotate(-8deg)', color: '#FCD34D' }}>ÉCHANGE</span>
            <span className={styles.handwrittenKeyword} style={{ top: '75%', left: '8%', fontSize: '1.5rem', transform: 'rotate(12deg)' }}>VENTE</span>
            <span className={styles.handwrittenKeyword} style={{ top: '20%', left: '8%', fontSize: '1.6rem', transform: 'rotate(-10deg)', color: '#FCD34D' }}>ACHAT</span>
            <span className={styles.handwrittenKeyword} style={{ bottom: '15%', left: '42%', fontSize: '1.4rem', transform: 'rotate(-5deg)' }}>PRÊT</span>

            {/* Sketch Arrows */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {/* Arrow towards center */}
                <path d="M15,65 Q25,55 35,62" className={styles.sketchLine} strokeDasharray="5,3" />
                <path d="M32,58 L37,63 L30,66" className={styles.sketchLine} />
                
                {/* Scribble near top */}
                <path d="M25,12 Q30,8 35,15" className={styles.sketchLine} opacity="0.5" />
            </svg>
        </div>
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
                <span>LIVRAISON OFFERTE DÈS 25€ DE LIVRES D'OCCASION —— <strong>TROUVEZ VOTRE MANUEL EN 2 MIN</strong></span>
            </div>

            {/* =============== NAVBAR =============== */}
            <nav className={styles.navbar}>
                <div className={styles.navInner}>
                    <div className={styles.navLogo} onClick={() => scrollTo('hero')}>
                        <YTeraLogo size={18} />
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
                        <SlideDecoration slideIndex={slide} />
                        
                        {/* ZONE DROITE & FLOTTANTE : Les 5 Assets (Turnkey Structure) */}
                        {slide === 2 && (
                            <div className={styles.tealStaticAssets}>
                                {/* Artisanal Texture Accents */}
                                <div className={styles.heroTealTexture} />
                                <div className={`${styles.dotGrid} ${styles.dotGridTopLeft}`} />
                                <div className={`${styles.dotGrid} ${styles.dotGridBottomRight}`} />
                                <div className={`${styles.floatingPlus} ${styles.floatingPlus1}`}>+</div>
                                <div className={`${styles.floatingPlus} ${styles.floatingPlus2}`}>x</div>

                                <img 
                                    src={phoneIllustration} 
                                    alt="Téléphone app Book-In" 
                                    className={styles.phoneIllustration} 
                                />
                                <div className={styles.calendarWrapper}>
                                    <img 
                                        src={examCalendar} 
                                        alt="Calendrier Examens" 
                                        className={styles.examCalendar} 
                                    />
                                </div>
                                <img 
                                    src={thinkingWoman} 
                                    alt="Étudiante qui réfléchit" 
                                    className={styles.womanImage} 
                                />
                                <img 
                                    src={thoughtBubble} 
                                    alt="Bulle de pensée livres" 
                                    className={styles.thoughtBubble} 
                                />
                                <img 
                                    src={solidaireLabel} 
                                    alt="Label Emprunt Solidaire" 
                                    className={styles.empruntBadge} 
                                />
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className={`${styles.bannerContent} ${currentSlideData.isFlipped ? styles.bannerContentFlipped : ''}`}
                            >

                                <div className={`${styles.bannerText} ${currentSlideData.textClass || ''}`}>
                                    <h1 className={`${styles.bannerTitle} ${currentSlideData.titleClass || ''}`} style={{ color: currentSlideData.titleColor || currentSlideData.textColor }}>
                                        {slide === 2 ? (
                                            <>
                                                EXAMENS PROCHES ?<br />
                                                RÉVISEZ SANS<br />
                                                VOUS <span style={{ position: 'relative', display: 'inline-block' }}>
                                                    RUINER !
                                                    <svg className={styles.sketchyUnderline} viewBox="0 0 100 12" preserveAspectRatio="none">
                                                        <path d="M5,7 Q25,2 45,8 T85,5" stroke="#FACC15" strokeWidth="3" fill="none" strokeLinecap="round" />
                                                    </svg>
                                                </span>
                                            </>
                                        ) : (
                                            <>
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
                                            </>
                                        )}
                                    </h1>
                                    <p className={styles.bannerSubtitle} style={{ color: currentSlideData.subtitleColor || currentSlideData.textColor, opacity: 0.9 }}>
                                        {currentSlideData.subtitle}
                                    </p>
                                    <button
                                        className={`${styles.bannerCta} ${slide === 1 ? styles.bannerCtaRect : ''}`}
                                        onClick={() => navigate('/register')}
                                        style={{ background: currentSlideData.ctaBg, color: currentSlideData.ctaColor }}
                                    >
                                        {currentSlideData.cta}
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                                {/* Photographic Visual for the first slide */}
                                <div className={styles.bannerHeroVisual}>
                                    {/* Traditional flex-right visual for other slides */}
                                    {slide !== 2 && (
                                        <>
                                            {slide === 0 && (
                                                <>
                                                    <div className={styles.occasionBadge}>
                                                        <span className={styles.occasionText}>d'occasion</span>
                                                        <svg className={styles.occasionArrow} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M20,20 C40,10 70,30 50,60 C30,90 80,90 90,80" stroke="#1A0F2E" strokeWidth="3" fill="none" pathLength="1" className={styles.sketchPath} />
                                                            <path d="M85,75 L95,85 L80,90" stroke="#1A0F2E" strokeWidth="3" fill="none" pathLength="1" className={styles.sketchPathArrowhead} />
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

                                            {slide === 1 && (
                                                <>
                                                    {/* Studio Atmosphere */}
                                                    <div className={styles.groundCement} />
                                                    <div className={styles.megaphoneLight} />

                                                    {/* handwritten sticker */}
                                                    <div className={styles.gratuitBadge}>
                                                        <span className={styles.gratuitText}>c'est gratuit</span>
                                                        <svg className={styles.gratuitArrow} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M20,20 C40,10 70,30 50,60 C30,90 80,90 90,80" stroke="#FACC15" strokeWidth="3" fill="none" />
                                                            <path d="M85,75 L95,85 L80,90" stroke="#FACC15" strokeWidth="3" fill="none" />
                                                        </svg>
                                                    </div>

                                                    {/* Mascot Slide 1 */}
                                                    <img
                                                        src={megaphoneWoman}
                                                        alt="Étudiante avec un mégaphone"
                                                        className={styles.megaphoneWomanStudio}
                                                    />
                                                </>
                                            )}

                                            {slide === 3 && (
                                                <img
                                                    src={heroMascot}
                                                    alt="Mascotte yTera"
                                                    className={`${styles.megaphoneWomanStudio} ${currentSlideData.mascotClass || ''}`}
                                                    style={{ 
                                                        objectPosition: 'left bottom',
                                                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))'
                                                    }}
                                                />
                                            )}
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

            {/* =============== TROUVEZ VOTRE PROCHAIN MANUEL =============== */}
            <section className={styles.bestSellers}>
                <div className={styles.bestSellersInner}>
                    <div className={styles.bestSellersMenu}>
                        <div className={styles.bestSellersMenuTitle}>
                            <h3>Trouvez votre prochain manuel</h3>
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

            {/* =============== CATEGORIES (NEW SECTION) =============== */}
            <section className={styles.categoriesSection}>
                <Reveal>
                    <div className={styles.sectionHeaderCentered}>
                        <h2 className={styles.sectionTitle}>Parcourez par Filière</h2>
                        <p className={styles.sectionSubtitle}>Trouvez rapidement les manuels spécifiques à votre domaine d'étude.</p>
                        <div className={styles.titleUnderline}></div>
                    </div>
                </Reveal>
                <div className={styles.categoriesGrid}>
                    {[
                        { icon: Stethoscope, name: 'Médecine', count: '120+', color: '#EF4444' },
                        { icon: GraduationCap, name: 'Ingénierie', count: '85+', color: '#3B82F6' },
                        { icon: Gavel, name: 'Droit', count: '64+', color: '#8B5CF6' },
                        { icon: Landmark, name: 'Économie', count: '92+', color: '#10B981' },
                        { icon: Languages, name: 'Langues', count: '45+', color: '#F59E0B' },
                    ].map((cat, i) => {
                        const Icon = cat.icon;
                        return (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className={styles.categoryCard} onClick={() => setShowModal(true)}>
                                    <div className={styles.categoryIcon} style={{ color: cat.color }}>
                                        <Icon size={32} />
                                    </div>
                                    <div className={styles.categoryInfo}>
                                        <h3>{cat.name}</h3>
                                        <span>{cat.count} livres</span>
                                    </div>
                                    <ArrowRight size={18} className={styles.categoryArrow} />
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* =============== COMMENT ÇA MARCHE ? =============== */}
            <section id="process" className={styles.processSection}>
                <Reveal>
                    <div className={styles.sectionHeaderCentered}>
                        <h2 className={styles.sectionTitle}>Comment ça marche ? 📚</h2>
                        <div className={styles.titleUnderline}></div>
                    </div>
                </Reveal>
                <div className={styles.steps}>
                    {[
                        { num: '01', icon: Search, title: 'Trouve ton manuel', desc: 'Recherche par titre, filière ou module. C\'est simple et rapide.', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.05)' },
                        { num: '02', icon: Mail, title: 'Contacte le propriétaire', desc: 'Discute en direct pour un prêt, un don ou un achat en toute sécurité.', color: '#FF5722', bg: 'rgba(255, 87, 34, 0.05)' },
                        { num: '03', icon: BookOpen, title: 'Échangez sur le campus', desc: 'Remise en main propre, pas de frais de livraison. Économique et solidaire.', color: '#10B981', bg: 'rgba(16, 185, 129, 0.05)' },
                    ].map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <Reveal key={i} delay={i * 0.15}>
                                <div className={styles.stepCard} style={{ borderColor: step.color }}>
                                    <div className={styles.stepIcon} style={{ background: step.bg, color: step.color }}>
                                        <Icon size={28} />
                                    </div>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </Reveal>
                        );
                    })}
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

            {/* =============== L'IMPACT ÉTUDIANT =============== */}
            <section className={styles.impactSection}>
                <Reveal>
                    <div className={styles.sectionHeaderCentered} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className={styles.sectionTitle}>L'impact Book-In 🌍</h2>
                        <p className={styles.sectionSubtitle}>Plus qu'une plateforme, un mouvement étudiant.</p>
                    </div>
                </Reveal>
                <div className={styles.impactGrid}>
                    <Reveal delay={0.1} direction="left">
                        <div className={styles.impactCard}>
                            <div className={styles.impactIcon} style={{ color: '#FF5722' }}><DollarSign size={40} /></div>
                            <h3>Argent économisé</h3>
                            <p>Les étudiants économisent en moyenne <strong>450 DH par semestre</strong> en privilégiant l'occasion et le prêt.</p>
                            <div className={styles.impactStats}>450 DH</div>
                        </div>
                    </Reveal>
                    <Reveal delay={0.2} direction="right">
                        <div className={styles.impactCard}>
                            <div className={styles.impactIcon} style={{ color: '#10B981' }}><Leaf size={40} /></div>
                            <h3>Impact écologique</h3>
                            <p>Chaque livre échangé évite la production d'un nouveau manuel. Donnez une <strong>seconde vie au papier</strong>.</p>
                            <div className={styles.impactStats}>-1.2kg CO2</div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* =============== LA GARANTIE ÉTUDIANTE =============== */}
            <section className={styles.guaranteeSection}>
                <Reveal>
                    <div className={styles.guaranteeBox}>
                        <div className={styles.guaranteeContent}>
                            <div className={styles.guaranteeBadge}><ShieldCheck size={24} /> La Garantie Étudiante</div>
                            <h2>Une plateforme faite par vous, pour vous.</h2>
                            <p>Parce qu'on connaît la réalité du terrain, notre plateforme est conçue pour simplifier la vie des étudiants marocains :</p>
                            <ul>
                                <li><Star size={18} /> Profils étudiants vérifiés</li>
                                <li><Star size={18} /> Communauté d'entraide active</li>
                                <li><Star size={18} /> Aucun frais de mise en relation</li>
                            </ul>
                        </div>
                        <div className={styles.guaranteeMascot}>
                            <img src={thoughtBubble} alt="Garantie Book-In" />
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* =============== CTA FINAL =============== */}
            <section className={styles.ctaFinal}>
                <Reveal>
                    <div className={styles.ctaFinalCard}>
                        <div className={styles.ctaFinalContent}>
                            <h2>Des manuels dorment sur tes étagères ?</h2>
                            <p>Fais de la place et aide un autre étudiant en publiant tes livres en quelques clics.</p>
                            <div className={styles.ctaButtons}>
                                <button className={styles.ctaPrimary} onClick={() => navigate('/register')}>
                                    Mettre en ligne un livre <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.ctaFinalGraphic}>
                            <BookOpen size={180} className={styles.ctaFinalIcon} />
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* =============== FOOTER =============== */}
            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <div className={styles.footerBrand}>
                        <YTeraLogo size={20} />
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
