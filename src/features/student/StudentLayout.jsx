import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Bell, LogOut, Plus, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useAuth } from '../auth/useAuth';
import YTeraLogo from '../../components/common/YTeraLogo';
import styles from './StudentLayout.module.css';

export default function StudentLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfile, setShowProfile] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3);
    const [navSearch, setNavSearch] = useState('');
    const [searchFilter, setSearchFilter] = useState('all');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchInputRef = React.useRef(null);

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
            if (e.key === 'Escape') {
                searchInputRef.current?.blur();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleNavSearch = (e) => {
        if (e.key === 'Enter' && navSearch.trim()) {
            navigate(`/student-dashboard/search?q=${encodeURIComponent(navSearch.trim())}&filter=${searchFilter}`);
            setNavSearch('');
            searchInputRef.current?.blur();
        }
    };

    return (
        <div className={styles.layout}>
            {/* ——— Translucent Navbar ——— */}
            <motion.nav
                className={styles.navbar}
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className={styles.navInner}>
                    {/* Logo */}
                    <div className={styles.logo} onClick={() => navigate('/student-dashboard')}>
                        <YTeraLogo size={20} />
                    </div>

                    {/* Global Search (Always Visible, with Focus Overlay & Filters) */}
                    <div className={`${styles.searchBar} ${isSearchFocused ? styles.searchBarFocused : ''}`}>
                        <select 
                            className={styles.searchSelect} 
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                        >
                            <option value="all">Toute la plateforme</option>
                            <option value="title">Titre</option>
                            <option value="filiere">Filière</option>
                        </select>
                        <div className={styles.searchDivider}></div>
                        <Search size={18} className={styles.searchIcon} />
                        <input 
                            ref={searchInputRef}
                            className={styles.searchInput}
                            type="text" 
                            placeholder="Rechercher des manuels..." 
                            value={navSearch} 
                            onChange={e => setNavSearch(e.target.value)} 
                            onKeyDown={handleNavSearch} 
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                        <kbd className={styles.searchShortcut}>
                            ⌘ K
                        </kbd>
                    </div>

                    {/* Overlay d'assombrissement (Focus Effect) */}
                    {isSearchFocused && <div className={styles.searchOverlay} onClick={() => searchInputRef.current?.blur()}></div>}

                    {/* Actions */}
                    <div className={styles.actions}>
                        <button className={styles.dashboardBtn} onClick={() => navigate('/student-dashboard/messages')} title="Messagerie">
                            <MessageSquare size={16} /> <span className={styles.hideOnMobile}>Messages</span>
                        </button>

                        <button className={styles.dashboardBtn} onClick={() => navigate('/student-dashboard/dashboard')} title="Mon Tableau de Bord">
                            <LayoutDashboard size={16} /> <span className={styles.hideOnMobile}>Dashboard</span>
                        </button>

                        <button className={styles.publishBtn} onClick={() => navigate('/student-dashboard/publish')}>
                            <Plus size={16} /> <span className={styles.hideOnMobile}>Publier</span>
                        </button>

                        <button className={styles.iconBtn} onClick={() => setUnreadCount(0)}>
                            <Bell size={19} />
                            {unreadCount > 0 && <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>}
                        </button>

                        <div className={styles.profileWrap}>
                            <button className={styles.avatarBtn} onClick={() => setShowProfile(!showProfile)}>
                                <div className={styles.avatar}><User size={16} /></div>
                            </button>
                            {showProfile && (
                                <motion.div className={styles.profileMenu}
                                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <div className={styles.profileHeader}>
                                        <strong>{user?.name || 'Étudiant'}</strong>
                                        <span>{user?.email || 'etudiant@ytera.ma'}</span>
                                    </div>
                                    <button onClick={() => { setShowProfile(false); navigate('/student-dashboard/dashboard'); }}><User size={15} /> Mon Profil</button>
                                    <button onClick={() => { logout(); navigate('/login'); }}><LogOut size={15} /> Déconnexion</button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* ——— Content ——— */}
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
}
