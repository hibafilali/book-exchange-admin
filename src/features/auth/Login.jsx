import { useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { BookOpen, Lock, Mail } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError('Identifiants invalides (utilisez admin@bourse.com / admin)');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.backgroundBlobs}>
                <div className={styles.blob1}></div>
                <div className={styles.blob2}></div>
            </div>

            <div className={`glass-panel ${styles.loginBox}`}>
                <div className={styles.header}>
                    <div className={styles.iconContainer}>
                        <BookOpen size={32} color="var(--accent-color)" />
                    </div>
                    <h2>Administration</h2>
                    <p>Connectez-vous pour gérer BourseManuels</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email Admin</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.inputIcon} size={18} />
                            <input
                                id="email"
                                type="email"
                                placeholder="admin@bourse.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Mot de passe</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} size={18} />
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.loginBtn}>
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}
