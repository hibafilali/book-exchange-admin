import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
    BookOpen, Search, ArrowRight, DollarSign, Leaf, Zap,
    Users, BookMarked, TrendingUp, Heart, MapPin, Eye,
    ChevronRight, Mail, Sun, Moon, Star, Quote, Sparkles, ShieldCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './LandingPage.module.css';

// ============================
// MOCK DATA
// ============================
const TEASER_BOOKS = [
    { id: 1, titre: "Algorithmes et Structures de Données", auteur: "Thomas H. Cormen", type: "VENTE", prix: 150, etat: "NEUF", nbVues: 230, ville: "Fès", photo: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop" },
    { id: 2, titre: "Introduction au Droit Civil", auteur: "Jean Carbonnier", type: "DON", prix: null, etat: "BON", nbVues: 45, ville: "Casablanca", photo: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop" },
    { id: 3, titre: "Macroéconomie Approfondie", auteur: "Gregory Mankiw", type: "PRET", prix: null, etat: "BON", nbVues: 180, ville: "Rabat", photo: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop" },
    { id: 4, titre: "Architecture des Ordinateurs", auteur: "Andrew Tanenbaum", type: "VENTE", prix: 200, etat: "NEUF", nbVues: 310, ville: "Fès", photo: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=500&fit=crop" },
    { id: 5, titre: "Physique Quantique", auteur: "Jean-Louis Basdevant", type: "DON", prix: null, etat: "ACCEPTABLE", nbVues: 160, ville: "Rabat", photo: "https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=400&h=500&fit=crop" },
    { id: 6, titre: "Programmation Java", auteur: "Claude Delannoy", type: "PRET", prix: null, etat: "BON", nbVues: 95, ville: "Fès", photo: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=500&fit=crop" },
];

const TYPE_COLORS = { VENTE: '#F97316', PRET: '#06B6D4', DON: '#10B981' };
const TYPE_LABELS = { VENTE: 'Vente', PRET: 'Prêt', DON: 'Don' };
const ETAT_COLORS = { NEUF: '#10b981', BON: '#3b82f6', ACCEPTABLE: '#f59e0b', USE: '#64748b' };

const TESTIMONIALS = [
    { name: "Salma B.", filiere: "Droit · Casablanca", text: "J'ai trouvé mon Code Civil en 5 minutes, à moitié prix. Incroyable !", avatar: "S", color: "#F97316" },
    { name: "Youssef K.", filiere: "Informatique · Fès", text: "J'ai donné 8 manuels que je n'utilisais plus. La plateforme est super fluide.", avatar: "Y", color: "#06B6D4" },
    { name: "Amina R.", filiere: "Économie · Rabat", text: "Le prêt entre étudiants, c'est génial. J'ai économisé 400 DH ce semestre.", avatar: "A", color: "#10B981" },
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
        const duration = 1800;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) { setCount(num); clearInterval(timer); }
            else setCount(Math.floor(current));
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ============================
// REVEAL WRAPPER
// ============================
function Reveal({ children, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
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
        <div className={styles.page}>

            {/* =============== NAVBAR =============== */}
            <nav className={styles.navbar}>
                <div className={styles.navInner}>
                    <div className={styles.navLogo}>
                        <div className={styles.navLogoIcon}><BookOpen size={20} /></div>
                        <span>BourseManuels</span>
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
                        <button className={styles.navLogin} onClick={() => navigate('/login')}>Se connecter</button>
                        <button className={styles.navSignup} onClick={() => navigate('/register')}>
                            Créer un compte <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* =============== HERO =============== */}
            <section className={styles.hero}>
                <div className={styles.heroBlob1}></div>
                <div className={styles.heroBlob2}></div>
                <motion.div className={styles.heroContent}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className={styles.heroBadge}><Leaf size={14} /> Économie circulaire universitaire</div>
                    <h1 className={styles.heroTitle}>
                        Économisez sur vos études.<br />
                        <span className={styles.heroHighlight}>Donnez une seconde vie</span> à vos manuels.
                    </h1>
                    <p className={styles.heroSub}>
                        Achetez, prêtez ou offrez vos livres universitaires entre étudiants.
                        Zéro intermédiaire, zéro frais cachés.
                    </p>
                    <div className={styles.heroSearch}>
                        <Search size={20} className={styles.heroSearchIcon} />
                        <input type="text" placeholder="Rechercher un manuel par titre, ISBN ou filière..."
                            className={styles.heroSearchInput} onFocus={() => setShowModal(true)} />
                        <button className={styles.heroSearchBtn}>Rechercher</button>
                    </div>
                    <div className={styles.heroTrust}>
                        <div className={styles.heroAvatars}>
                            <div className={styles.heroAv} style={{ background: '#3b82f6' }}>A</div>
                            <div className={styles.heroAv} style={{ background: '#F97316' }}>S</div>
                            <div className={styles.heroAv} style={{ background: '#10b981' }}>M</div>
                            <div className={styles.heroAv} style={{ background: '#06B6D4' }}>K</div>
                        </div>
                        <span>Rejoint par <strong>300+ étudiants</strong> à travers le Maroc</span>
                    </div>
                </motion.div>
            </section>

            {/* =============== PROCESS / STEPS =============== */}
            <section id="process" className={styles.processSection}>
                <Reveal>
                    <h2 className={styles.sectionTitle}>Comment ça marche ?</h2>
                    <p className={styles.sectionSub}>Trois étapes simples pour échanger vos manuels</p>
                </Reveal>
                <div className={styles.steps}>
                    {[
                        { num: '01', icon: Search, title: 'Cherchez votre livre', desc: 'Parcourez le catalogue par titre, ISBN, filière ou type d\'échange.', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
                        { num: '02', icon: Mail, title: 'Contactez l\'étudiant', desc: 'Envoyez un message sécurisé sans exposer vos coordonnées personnelles.', color: '#F97316', bg: 'rgba(249,115,22,0.1)' },
                        { num: '03', icon: BookMarked, title: 'Récupérez votre manuel', desc: 'Organisez la remise en main propre dans votre ville ou campus.', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
                    ].map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <Reveal key={i} delay={0.1 + i * 0.15}>
                                <div className={styles.stepCard}>
                                    <div className={styles.stepNum} style={{ color: step.color }}>{step.num}</div>
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

            {/* =============== FEATURED BOOKS =============== */}
            <section id="books" className={styles.booksSection}>
                <Reveal>
                    <div className={styles.booksSectionHeader}>
                        <div>
                            <h2 className={styles.sectionTitle} style={{ textAlign: 'left' }}>Dernières annonces</h2>
                            <p className={styles.sectionSub} style={{ textAlign: 'left' }}>Découvrez les manuels récemment publiés par la communauté</p>
                        </div>
                        <button className={styles.seeAllBtn} onClick={() => setShowModal(true)}>
                            Voir tout le catalogue <ChevronRight size={18} />
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
                                    <div className={styles.bookEtat} style={{ background: ETAT_COLORS[b.etat] }}>{b.etat}</div>
                                    {b.nbVues >= 150 && <div className={styles.bookPopular}>🔥 Populaire</div>}
                                    <div className={styles.bookPrice} style={b.type === 'DON' ? { background: '#10b981' } : {}}>
                                        {b.type === 'VENTE' ? `${b.prix} DH` : b.type === 'DON' ? 'Gratuit' : 'Prêt'}
                                    </div>
                                </div>
                                <div className={styles.bookBody}>
                                    <h3>{b.titre}</h3>
                                    <p className={styles.bookAuthor}>{b.auteur}</p>
                                    <div className={styles.bookMeta}>
                                        <span><MapPin size={13} /> {b.ville}</span>
                                        <span><Eye size={13} /> {b.nbVues}</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Gradient overlay + CTA */}
                <div className={styles.booksOverlay}>
                    <div className={styles.booksOverlayInner}>
                        <h3>Envie de voir plus de manuels ?</h3>
                        <p>Créez un compte gratuit pour accéder à tout le catalogue et contacter les annonceurs.</p>
                        <button className={styles.glowBtn} onClick={() => navigate('/register')}>
                            <Sparkles size={18} /> Explorer tout le catalogue
                        </button>
                    </div>
                </div>
            </section>

            {/* =============== SOCIAL PROOF =============== */}
            <section id="proof" className={styles.proofSection}>
                {/* Stats counter bar */}
                <div className={styles.statsBar}>
                    {[
                        { value: '450', suffix: '+', label: 'Manuels disponibles', icon: BookMarked },
                        { value: '120', suffix: '+', label: 'Échanges réussis', icon: TrendingUp },
                        { value: '35000', suffix: ' DH', label: 'Économisés par les étudiants', icon: DollarSign },
                        { value: '300', suffix: '+', label: 'Étudiants inscrits', icon: Users },
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

                {/* Testimonials */}
                <Reveal>
                    <h2 className={styles.sectionTitle}>Ce que disent nos étudiants</h2>
                    <p className={styles.sectionSub}>Des retours authentiques de la communauté BourseManuels</p>
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
                                    <div className={styles.testimonialStars}>
                                        {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* =============== CTA FINAL =============== */}
            <section className={styles.ctaFinal}>
                <div className={styles.ctaFinalBlob1}></div>
                <div className={styles.ctaFinalBlob2}></div>
                <Reveal>
                    <div className={styles.ctaFinalContent}>
                        <ShieldCheck size={40} className={styles.ctaFinalIcon} />
                        <h2>Prêt à économiser sur vos études ?</h2>
                        <p>Rejoignez des centaines d'étudiants qui échangent déjà leurs manuels. C'est gratuit, rapide et sécurisé.</p>
                        <div className={styles.ctaButtons}>
                            <button className={styles.ctaPrimary} onClick={() => navigate('/register')}>
                                Commencer gratuitement <ArrowRight size={18} />
                            </button>
                            <button className={styles.ctaSecondary} onClick={() => scrollTo('process')}>En savoir plus</button>
                        </div>
                    </div>
                </Reveal>
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
                    <motion.div className={styles.modalBox} onClick={e => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className={styles.modalIcon}><Heart size={32} /></div>
                        <h3>Connectez-vous pour continuer</h3>
                        <p>Créez un compte gratuit pour accéder au catalogue complet, contacter les annonceurs et publier vos propres manuels.</p>
                        <div className={styles.modalActions}>
                            <button className={styles.modalPrimary} onClick={() => navigate('/register')}>
                                Créer un compte <ArrowRight size={16} />
                            </button>
                            <button className={styles.modalSecondary} onClick={() => setShowModal(false)}>Plus tard</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
