import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { Bell, Search, User, Sun, Moon, LogOut, Settings, MessageSquare, BookOpen } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [showNotifs, setShowNotifs] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    // Close dropdowns when clicking outside
    const notifRef = useRef();
    const profileRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifs(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className={`glass-panel ${styles.header}`}>
            <div className={styles.searchContainer}>
                <Search size={18} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Rechercher utilisateurs, annonces..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.rightSection}>
                <button
                    className={styles.iconBtn}
                    onClick={toggleTheme}
                    title={isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className={styles.dropdownContainer} ref={notifRef}>
                    <button
                        className={styles.iconBtn}
                        onClick={() => setShowNotifs(!showNotifs)}
                    >
                        <Bell size={20} />
                        <span className={styles.badge}>3</span>
                    </button>

                    {showNotifs && (
                        <div className={styles.dropdownMenu}>
                            <div className={styles.dropdownHeader}>
                                <h4>Notifications</h4>
                                <span>3 nouvelles</span>
                            </div>
                            <div className={styles.dropdownList}>
                                <div
                                    className={styles.dropdownItem}
                                    onClick={() => { navigate('/moderation'); setShowNotifs(false); }}
                                >
                                    <div className={`${styles.notifIcon} ${styles.notifAlert}`}><MessageSquare size={16} /></div>
                                    <div className={styles.notifContent}>
                                        <p>Nouveau signalement: "Arnaque"</p>
                                        <span>Il y a 5 min</span>
                                    </div>
                                </div>
                                <div
                                    className={styles.dropdownItem}
                                    onClick={() => { navigate('/annonces'); setShowNotifs(false); }}
                                >
                                    <div className={`${styles.notifIcon} ${styles.notifBook}`}><BookOpen size={16} /></div>
                                    <div className={styles.notifContent}>
                                        <p>12 annonces en attente</p>
                                        <span>Il y a 1 heure</span>
                                    </div>
                                </div>
                                <div
                                    className={styles.dropdownItem}
                                    onClick={() => { navigate('/users'); setShowNotifs(false); }}
                                >
                                    <div className={`${styles.notifIcon} ${styles.notifUser}`}><User size={16} /></div>
                                    <div className={styles.notifContent}>
                                        <p>Nouvel utilisateur inscrit</p>
                                        <span>Il y a 2 heures</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                className={styles.dropdownFooterBtn}
                                onClick={() => { navigate('/annonces'); setShowNotifs(false); }}
                            >
                                Voir toutes les alertes
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.dropdownContainer} ref={profileRef}>
                    <div
                        className={styles.userProfile}
                        onClick={() => setShowProfile(!showProfile)}
                    >
                        <div className={styles.avatar}>
                            <User size={20} />
                        </div>
                        <div className={styles.userInfo}>
                            <p className={styles.userName}>{user?.name || 'Admin'}</p>
                            <p className={styles.userRole}>{user?.role || 'Superadmin'}</p>
                        </div>
                    </div>

                    {showProfile && (
                        <div className={styles.dropdownMenu}>
                            <div className={styles.profileHeader}>
                                <div className={styles.avatar}>
                                    <User size={20} />
                                </div>
                                <div className={styles.userInfo}>
                                    <p className={styles.userName}>{user?.name || 'Admin'}</p>
                                    <p className={styles.userEmail}>{user?.email || 'admin@ytera.ma'}</p>
                                </div>
                            </div>
                            <div className={styles.dropdownList}>
                                <button
                                    className={styles.dropdownActionBtn}
                                    onClick={() => { navigate('/settings'); setShowProfile(false); }}
                                >
                                    <Settings size={16} /> Paramètres du compte
                                </button>
                                <button
                                    className={`${styles.dropdownActionBtn} ${styles.logoutText}`}
                                    onClick={() => { logout(); setShowProfile(false); }}
                                >
                                    <LogOut size={16} /> Déconnexion
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
