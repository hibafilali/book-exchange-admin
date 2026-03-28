import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import styles from './Login.module.css';
import { BookOpen, Lock, Mail, User, Shield, Loader2, ArrowRight } from 'lucide-react';
import YTeraLogo from '../../components/common/YTeraLogo';

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
            <div className={styles.noiseOverlay} />
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
                            {/* Background Elements */}
                            <circle cx="250" cy="250" r="180" fill="#3B82F6" fillOpacity="0.05" />
                            <rect x="350" y="100" width="50" height="50" rx="12" transform="rotate(-15 350 100)" fill="#FABE24" fillOpacity="0.2" />
                            <circle cx="120" cy="150" r="20" fill="#FF5722" fillOpacity="0.1" />
                            
                            {/* Table Surface */}
                            <rect x="100" y="380" width="300" height="8" rx="4" fill="#E2E8F0" />
                            
                            {/* Professional Student (Scholar) */}
                            {/* Hair/Head */}
                            <circle cx="250" cy="180" r="35" fill="#1E293B" />
                            <circle cx="250" cy="190" r="30" fill="#FFC9A9" />
                            
                            {/* Glasses (Scholar vibe) */}
                            <circle cx="235" cy="190" r="8" stroke="#1E293B" strokeWidth="1.5" />
                            <circle cx="265" cy="190" r="8" stroke="#1E293B" strokeWidth="1.5" />
                            <path d="M243 190 L 257 190" stroke="#1E293B" strokeWidth="1.5" />
                            
                            {/* Body (Reading pose) */}
                            <path d="M200 380 L300 380 L280 240 C 280 240 250 225 220 240 Z" fill="#FF5722" />
                            
                            {/* Open Book */}
                            <path d="M200 340 L250 330 L300 340 L300 375 L250 365 L200 375 Z" fill="#FFFFFF" stroke="#E2E8F0" />
                            <path d="M250 330 L 250 365" stroke="#E2E8F0" strokeWidth="1" />
                        </svg>
                    </motion.div>

                    <motion.div 
                        className={styles.visualText}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1>Libérez le potentiel de vos manuels.</h1>
                        <p>Rejoignez yTera, la communauté d'échange de manuels au Maroc.</p>
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
                        <YTeraLogo size={32} showSlogan={true} />
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
                                    placeholder={isStudent ? "etudiant@ytera.ma" : "admin@ytera.ma"}
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
                            <p>Réservé aux collaborateurs yTera.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
