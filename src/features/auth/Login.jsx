import { useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import styles from './Login.module.css';
import { BookOpen, Lock, Mail, User, Shield, Loader2 } from 'lucide-react';

export default function Login() {
    const [isStudent, setIsStudent] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const role = isStudent ? 'STUDENT' : 'ADMIN';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        // Simuler un appel système
        await new Promise(r => setTimeout(r, 1200));
        
        const success = await login(email, password, role);
        setIsLoading(false);
        
        if (success) {
            toast.success(`Connexion réussie ! Bienvenue ${isStudent ? 'Étudiant' : 'Admin'}`, { duration: 3000 });
            if (role === 'ADMIN') {
                navigate('/');
            } else {
                navigate('/student-dashboard');
            }
        } else {
            toast.error("Identifiants invalides.");
            setError(`Identifiants invalides pour l'espace ${isStudent ? 'Étudiant' : 'Admin'}.`);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.backgroundBlobs}>
                <div className={styles.blob1}></div>
                <div className={styles.blob2}></div>
            </div>

            <div className={`glass-panel ${styles.loginBox}`}>
                
                {/* Role Selector */}
                <div className={styles.roleSelector}>
                    <div className={`${styles.slider} ${isStudent ? styles.sliderStudent : styles.sliderAdmin}`}></div>
                    <button 
                        type="button" 
                        className={`${styles.roleBtn} ${isStudent ? styles.activeStudent : ''}`}
                        onClick={() => { setIsStudent(true); setError(''); }}
                    >
                        <User size={18} />
                        Étudiant
                    </button>
                    <button 
                        type="button" 
                        className={`${styles.roleBtn} ${!isStudent ? styles.activeAdmin : ''}`}
                        onClick={() => { setIsStudent(false); setError(''); }}
                    >
                        <Shield size={18} />
                        Admin
                    </button>
                </div>

                <div className={styles.header}>
                    <div className={`${styles.iconContainer} ${isStudent ? styles.iconContainerStudent : styles.iconContainerAdmin}`}>
                        <BookOpen size={32} color="white" />
                    </div>
                    <h2>{isStudent ? 'Espace Étudiant' : 'Administration'}</h2>
                    <p>{isStudent ? 'Connectez-vous pour échanger vos manuels' : 'Connectez-vous pour gérer BOOK-IN'}</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">{isStudent ? 'Email Universitaire' : 'Email Admin'}</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.inputIcon} size={18} />
                            <input
                                id="email"
                                type="email"
                                placeholder={isStudent ? "etudiant@univ.com" : "admin@book-in.ma"}
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

                    <button type="submit" className={`${styles.loginBtn} ${isStudent ? styles.btnStudent : styles.btnAdmin}`} disabled={isLoading}>
                        {isLoading ? <><Loader2 size={18} className={styles.spinner} /> Connexion...</> : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
}
