import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Heart, Repeat, ChevronLeft, ChevronRight, Sparkles, TrendingUp } from 'lucide-react';
import ManualCard from './ManualCard';
import styles from './StudentHome.module.css';

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
    { id: 9, titreAnnonce: "Physique Quantique", auteur: "Jean-Louis Basdevant", typeEchange: "DON", prixVente: null, etat: "ACCEPTABLE", nbVues: 160, photoUrl: "https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=400&h=500&fit=crop", ville: "Rabat", filiere: "Physique", isbn: "978-2100494684", nbOperations: 6 },
    { id: 10, titreAnnonce: "Marketing Digital", auteur: "Dave Chaffey", typeEchange: "VENTE", prixVente: 180, etat: "NEUF", nbVues: 140, photoUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop", ville: "Casablanca", filiere: "Gestion", isbn: "978-2098765432", nbOperations: 3 },
];

const QUICK_STATS = [
    { label: 'Annonces Actives', value: '12', icon: BookOpen, gradient: 'var(--gradient-vente)' },
    { label: 'Livres Sauvegardés', value: '5', icon: Heart, gradient: 'var(--gradient-pret)' },
    { label: 'Prêts en cours', value: '2', icon: Repeat, gradient: 'var(--gradient-don)' },
];

const FILTERS = ['Tous', 'Vente', 'Prêt', 'Don'];
const FILTER_MAP = { 'Tous': null, 'Vente': 'VENTE', 'Prêt': 'PRET', 'Don': 'DON' };

// ============================
// COMPONENT
// ============================
export default function StudentHome() {
    const [activeFilter, setActiveFilter] = useState('Tous');
    const [searchQuery, setSearchQuery] = useState('');
    const sliderRef = useRef(null);

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

            {/* ====== HERO ====== */}
            <motion.section
                className={styles.hero}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.heroBlob1}></div>
                <div className={styles.heroBlob2}></div>

                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Trouvez vos manuels<br/>
                        <span className={styles.heroHighlight}>en un clic</span>
                    </h1>
                    <p className={styles.heroSub}>
                        Parcourez des centaines de manuels universitaires à prix réduits, en prêt ou en don.
                    </p>

                    <div className={styles.heroSearch}>
                        <Search size={20} className={styles.heroSearchIcon} />
                        <input
                            type="text"
                            placeholder="Titre, ISBN ou filière..."
                            className={styles.heroSearchInput}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <button className={styles.heroSearchBtn}>Rechercher</button>
                    </div>
                </div>
            </motion.section>

            {/* ====== QUICK STATS (Bento Grid) ====== */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    {QUICK_STATS.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={i}
                                className={styles.statCard}
                                style={{ background: stat.gradient }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <Icon size={24} />
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ====== FILTER TABS + GRID ====== */}
            <section className={styles.gridSection}>
                <div className={styles.gridHeader}>
                    <div className={styles.gridTitle}>
                        <Sparkles size={22} className={styles.gridTitleIcon} />
                        <h2>Dernières Pépites</h2>
                    </div>
                    <div className={styles.filters}>
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                className={`${styles.filterTab} ${activeFilter === f ? styles.filterActive : ''}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.cardsGrid}>
                    {filteredAnnonces.map((a, i) => (
                        <ManualCard key={a.id} annonce={a} index={i} />
                    ))}
                    {filteredAnnonces.length === 0 && (
                        <div className={styles.emptyState}>
                            <BookOpen size={48} />
                            <h3>Aucun résultat trouvé</h3>
                            <p>Essayez d'ajuster vos filtres ou votre recherche.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ====== FILIÈRE SLIDER ====== */}
            <section className={styles.sliderSection}>
                <div className={styles.sliderHeader}>
                    <div className={styles.gridTitle}>
                        <TrendingUp size={22} className={styles.gridTitleIcon} />
                        <h2>Pour votre filière · Informatique</h2>
                    </div>
                    <div className={styles.sliderNav}>
                        <button className={styles.sliderBtn} onClick={() => scrollSlider(-1)}><ChevronLeft size={18} /></button>
                        <button className={styles.sliderBtn} onClick={() => scrollSlider(1)}><ChevronRight size={18} /></button>
                    </div>
                </div>

                <div className={styles.slider} ref={sliderRef}>
                    {filiereAnnonces.map((a, i) => (
                        <div key={a.id} className={styles.sliderItem}>
                            <ManualCard annonce={a} index={i} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
