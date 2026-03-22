import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Sun, Moon, User, Bell, LogOut, Plus, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useAuth } from '../auth/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import styles from './StudentLayout.module.css';

export default function StudentLayout() {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3);
    const [navSearch, setNavSearch] = useState('');

    const handleNavSearch = (e) => {
        if (e.key === 'Enter' && navSearch.trim()) {
            navigate(`/student-dashboard/search?q=${encodeURIComponent(navSearch.trim())}`);
            setNavSearch('');
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
                        <div className={styles.logoIcon}><BookOpen size={20} /></div>
                        <span>BourseManuels</span>
                    </div>

                    {/* Removed Search from Navbar to center focus on Hero */}

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

                        <button className={styles.iconBtn} onClick={toggleTheme} title={isDarkMode ? 'Mode clair' : 'Mode sombre'}>
                            {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
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
                                        <span>{user?.email || 'etudiant@bourse.com'}</span>
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
