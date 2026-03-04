import { useAuth } from '../../features/auth/AuthContext';
import { Bell, Search, User } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    const { user } = useAuth();

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
                <button className={styles.iconBtn}>
                    <Bell size={20} />
                    <span className={styles.badge}>3</span>
                </button>

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>
                        <User size={20} />
                    </div>
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>{user?.name || 'Admin'}</p>
                        <p className={styles.userRole}>{user?.role || 'Superadmin'}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
