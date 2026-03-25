import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import styles from './Login.module.css';
import { BookOpen, Lock, Mail, User, Shield, Loader2, ArrowRight } from 'lucide-react';
import BookInLogo from '../../components/common/BookInLogo';

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
        <div className={styles.page}>
            {/* LEFT SIDE: VISUAL area (Desktop only) */}
            <div className={styles.visualSide}>
                <div className={styles.visualContent}>
                    {/* Organic Blobs */}
                    <motion.div className={styles.blobOrange} animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity }} />
                    <motion.div className={styles.blobBlue} animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} />
                    
                    {/* Scholar Illustration SVG */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.8 }}
                    >
                        <svg className={styles.illustration} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M180 320 C 180 320 150 200 120 200 C 80 200 60 220 60 280 C 60 330 90 370 140 370 Z" fill="#3B82F6" />
                            <path d="M100 370 L 80 480" stroke="#1E293B" strokeWidth="22" strokeLinecap="round" />
                            <circle cx="120" cy="140" r="35" fill="#FFC9A9" />
                            <path d="M320 320 C 320 320 350 200 380 200 C 420 200 440 220 440 280 C 440 330 410 370 360 370 Z" fill="#10B981" />
                            <path d="M400 370 L 420 480" stroke="#1E293B" strokeWidth="22" strokeLinecap="round" />
                            <circle cx="380" cy="140" r="35" fill="#FDBA74" />
                            <path d="M220 240 L 260 230 L 280 260 L 240 270 Z" fill="#FF5722" />
                        </svg>
                    </motion.div>

                    <motion.div 
                        className={styles.visualText}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1>Votre savoir a de la valeur.</h1>
                        <p>Rejoignez la plus grande communauté d'échange de manuels au Maroc.</p>
                    </motion.div>
                </div>
            </div>

            {/* RIGHT SIDE: AUTH FORM */}
            <div className={styles.formSide}>
                <motion.div 
                    className={styles.loginCard}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                    <div className={styles.cardHeader}>
                        <BookInLogo size={32} />
                        <div className={styles.cardTitle}>
                            <h2>Ravi de vous revoir !</h2>
                            <p>Accédez à votre espace sécurisé.</p>
                        </div>
                    </div>

                    {/* Elegant Role Toggle */}
                    <div className={styles.roleToggle}>
                        <button 
                            className={`${styles.roleOption} ${isStudent ? styles.roleActive : ''}`}
                            onClick={() => setIsStudent(true)}
                        >
                            <span>Espace Étudiant</span>
                            {isStudent && <motion.div layoutId="activeTab" className={styles.activeBar} />}
                        </button>
                        <button 
                            className={`${styles.roleOption} ${!isStudent ? styles.roleActive : ''}`}
                            onClick={() => setIsStudent(false)}
                        >
                            <span>Espace Admin</span>
                            {!isStudent && <motion.div layoutId="activeTab" className={styles.activeBar} />}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Adresse Email</label>
                            <div className={styles.field}>
                                <Mail size={18} className={styles.fieldIcon} />
                                <input 
                                    type="email" 
                                    placeholder={isStudent ? "etudiant@book-in.ma" : "admin@book-in.ma"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Mot de passe</label>
                            <div className={styles.field}>
                                <Lock size={18} className={styles.fieldIcon} />
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className={styles.submitBtn} 
                            disabled={isLoading}
                            style={{ background: isStudent ? '#FF5722' : '#0F172A' }}
                        >
                            {isLoading ? <Loader2 size={18} className={styles.spinning} /> : 'Continuer'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className={styles.cardFooter}>
                        {isStudent && (
                            <p>Pas encore de compte ? <button onClick={() => navigate('/register')}>S'inscrire gratuitement</button></p>
                        )}
                        {!isStudent && (
                            <p>Réservé aux collaborateurs BOOK-IN.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
