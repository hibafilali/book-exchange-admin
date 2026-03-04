import { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, Search, Eye } from 'lucide-react';
import styles from './AnnoncesList.module.css';

const MOCK_ANNONCES = [
    { id: 101, titre: 'Algèbre Linéaire - 2ème Édition', type: 'VENTE', prix: '15€', etat: 'BON', statut: 'En attente', etudiant: 'Jean Dupont' },
    { id: 102, titre: 'Programmation React', type: 'DON', prix: 'Gratuit', etat: 'USE', statut: 'Validée', etudiant: 'Sophie Martin' },
    { id: 103, titre: 'Physique Quantique Avancée', type: 'PRET', prix: 'Caution 20€', etat: 'NEUF', statut: 'Refusée', etudiant: 'Luc Bernard' },
    { id: 104, titre: 'Histoire de l\'Art', type: 'VENTE', prix: '10€', etat: 'ACCEPTABLE', statut: 'En attente', etudiant: 'Marie Lefebvre' },
];

export default function AnnoncesList() {
    const [annonces, setAnnonces] = useState(MOCK_ANNONCES);

    const updateStatut = (id, newStatut) => {
        setAnnonces(annonces.map(a => a.id === id ? { ...a, statut: newStatut } : a));
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Modération des Annonces</h1>
                    <p className={styles.subtitle}>En attente de validation, approuvées, refusées.</p>
                </div>
            </header>

            <div className={styles.statsBar}>
                <div className={`glass-panel ${styles.statBadge}`}>
                    <span>En attente</span>
                    <div className={styles.countBadge} style={{ background: 'var(--warning)', color: '#000' }}>
                        {annonces.filter(a => a.statut === 'En attente').length}
                    </div>
                </div>
                <div className={`glass-panel ${styles.statBadge}`}>
                    <span>Approuvées</span>
                    <div className={styles.countBadge} style={{ background: 'var(--success)', color: '#fff' }}>
                        {annonces.filter(a => a.statut === 'Validée').length}
                    </div>
                </div>
                <div className={`glass-panel ${styles.searchArea}`}>
                    <Search size={18} className={styles.searchIcon} />
                    <input type="text" placeholder="Rechercher par titre, étudiant..." />
                </div>
            </div>

            <div className={styles.grid}>
                {annonces.map(annonce => (
                    <div key={annonce.id} className={`glass-panel ${styles.card}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIcon}>
                                <BookOpen size={20} color="var(--accent-color)" />
                            </div>
                            <span className={`
                ${styles.statusBadge} 
                ${annonce.statut === 'Validée' ? styles.statusValid : ''}
                ${annonce.statut === 'Refusée' ? styles.statusRefused : ''}
                ${annonce.statut === 'En attente' ? styles.statusPending : ''}
              `}>
                                {annonce.statut}
                            </span>
                        </div>

                        <div className={styles.cardBody}>
                            <h3 className={styles.bookTitle}>{annonce.titre}</h3>
                            <p className={styles.bookSeller}>par {annonce.etudiant}</p>

                            <div className={styles.tags}>
                                <span className={styles.tag}>{annonce.type}</span>
                                <span className={styles.tag}>{annonce.prix}</span>
                                <span className={styles.tag}>État: {annonce.etat}</span>
                            </div>
                        </div>

                        <div className={styles.cardFooter}>
                            {annonce.statut === 'En attente' ? (
                                <>
                                    <button
                                        className={`${styles.actionBtn} ${styles.approveBtn}`}
                                        onClick={() => updateStatut(annonce.id, 'Validée')}
                                    >
                                        <CheckCircle size={16} /> Accepter
                                    </button>
                                    <button
                                        className={`${styles.actionBtn} ${styles.rejectBtn}`}
                                        onClick={() => updateStatut(annonce.id, 'Refusée')}
                                    >
                                        <XCircle size={16} /> Refuser
                                    </button>
                                </>
                            ) : (
                                <button className={styles.viewBtn}>
                                    <Eye size={16} /> Voir les détails
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
