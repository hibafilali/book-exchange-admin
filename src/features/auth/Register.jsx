import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Building2, MapPin, GraduationCap, ArrowRight, BookOpen, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import styles from './Register.module.css';

export default function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nom: '', prenom: '', email: '', 
        password: '', confirmPassword: '',
        filiere: '', etablissement: '', ville: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Real-time validation for password match
        if (name === 'confirmPassword' || name === 'password') {
            const pwd = name === 'password' ? value : formData.password;
            const confirm = name === 'confirmPassword' ? value : formData.confirmPassword;
            if (confirm && pwd !== confirm) {
                setErrors(prev => ({ ...prev, passwordMismatch: 'Les mots de passe ne correspondent pas' }));
            } else {
                setErrors(prev => ({ ...prev, passwordMismatch: null }));
            }
        }
    };

    const validateForm = () => {
        if (!formData.nom || !formData.prenom || !formData.email || !formData.password || !formData.filiere) {
            toast.error("Veuillez remplir les champs obligatoires.");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error("Vos mots de passe ne correspondent pas.");
            return false;
        }
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        // Simulate API call for user registration
        await new Promise(r => setTimeout(r, 1500));
        setIsLoading(false);

        toast.success("Bienvenue dans la communauté ! Redirection vers la page de connexion...", { duration: 4000 });
        navigate('/login');
    };

    return (
        <div className={styles.page}>
            <div className={styles.blob1}></div>
            <div className={styles.blob2}></div>
            <div className={styles.blob3}></div>

            <motion.div 
                className={styles.registerContainer}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className={styles.formHeader}>
                    <div className={styles.logoWrap}>
                        <BookOpen size={28} className={styles.logoIcon} />
                    </div>
                    <h1>Créer un compte</h1>
                    <p>Rejoignez BOOK-IN et commencez à échanger.</p>
                </div>

                <form onSubmit={handleRegister} className={styles.form}>
                    <div className={styles.formSectionTitle}>Informations Personnelles</div>
                    <div className={styles.inputGrid}>
                        <div className={styles.inputGroup}>
                            <User size={18} className={styles.inputIcon} />
                            <input type="text" name="prenom" placeholder="Prénom" 
                                value={formData.prenom} onChange={handleInputChange} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <User size={18} className={styles.inputIcon} />
                            <input type="text" name="nom" placeholder="Nom" 
                                value={formData.nom} onChange={handleInputChange} required />
                        </div>
                        <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                            <Mail size={18} className={styles.inputIcon} />
                            <input type="email" name="email" placeholder="Adresse Email universitaire ou personnelle" 
                                value={formData.email} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className={styles.formSectionTitle}>Sécurité</div>
                    <div className={styles.inputGrid}>
                        <div className={styles.inputGroup}>
                            <Lock size={18} className={styles.inputIcon} />
                            <input type="password" name="password" placeholder="Mot de passe" 
                                value={formData.password} onChange={handleInputChange} required />
                        </div>
                        <div className={`${styles.inputGroup} ${errors.passwordMismatch ? styles.inputError : ''}`}>
                            <Lock size={18} className={styles.inputIcon} />
                            <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" 
                                value={formData.confirmPassword} onChange={handleInputChange} required />
                        </div>
                        <AnimatePresence>
                            {errors.passwordMismatch && (
                                <motion.div className={styles.errorText} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}>
                                    <AlertCircle size={14} /> {errors.passwordMismatch}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className={styles.formSectionTitle}>Profil Étudiant</div>
                    <div className={styles.inputGrid}>
                        <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                            <GraduationCap size={18} className={styles.inputIcon} />
                            <input type="text" name="filiere" placeholder="Filière (ex: Informatique, Droit...)" 
                                value={formData.filiere} onChange={handleInputChange} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <Building2 size={18} className={styles.inputIcon} />
                            <input type="text" name="etablissement" placeholder="Établissement (ex: ENSA)" 
                                value={formData.etablissement} onChange={handleInputChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <MapPin size={18} className={styles.inputIcon} />
                            <input type="text" name="ville" placeholder="Ville d'échange" 
                                value={formData.ville} onChange={handleInputChange} />
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={isLoading || errors.passwordMismatch}>
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'S\'inscrire'}
                        {!isLoading && <ArrowRight size={18} />}
                    </button>
                    
                    <div className={styles.footerLinks}>
                        Vous avez déjà un compte ? <a onClick={(e) => { e.preventDefault(); navigate('/login'); }} href="#">Se connecter</a>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
