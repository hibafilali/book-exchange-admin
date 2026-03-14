import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, ShieldAlert, Settings, LogOut } from 'lucide-react';
import styles from './Sidebar.module.css';
import { useAuth } from '../../features/auth/useAuth';

const NAV_ITEMS = [
    { path: '/', label: 'Tableau de bord', icon: LayoutDashboard },
    { path: '/users', label: 'Utilisateurs', icon: Users },
    { path: '/annonces', label: 'Annonces', icon: BookOpen },
    { path: '/moderation', label: 'Modération', icon: ShieldAlert },
    { path: '/settings', label: 'Paramètres', icon: Settings },
];

export default function Sidebar() {
    const { logout } = useAuth();

    return (
        <aside className={`${styles.sidebar}`}>
            <div className={styles.logoContainer}>
                <div className={styles.minimalLogo}>
                    <span className={styles.logoLetter}>N</span>
                </div>
                <div className={styles.brandTitle}>
                    <span className={styles.logoTextMain}>Nex</span>
                    <span className={styles.logoTextSub}>Book</span>
                </div>
            </div>

            <nav className={styles.navMenu}>
                <p className={styles.menuLabel}>MENU PRINCIPAL</p>
                <ul className={styles.navList}>
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === '/'}
                                    className={({ isActive }) =>
                                        `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                                    }
                                >
                                    <Icon size={20} className={styles.navIcon} />
                                    <span>{item.label}</span>
                                    <div className={styles.activeIndicator} />
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className={styles.bottomSection}>
                <button className={styles.logoutBtn} onClick={logout}>
                    <LogOut size={20} />
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>
    );
}
