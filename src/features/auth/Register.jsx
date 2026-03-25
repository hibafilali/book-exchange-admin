import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Building2, MapPin, GraduationCap, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import styles from './Register.module.css';
import BookInLogo from '../../components/common/BookInLogo';

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
            {/* LEFT SIDE: Visual (Desktop) */}
            <div className={styles.visualSide}>
                <div className={styles.visualContent}>
                    <motion.div className={styles.blobGreen} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} />
                    <motion.div className={styles.blobBlue} animate={{ x: [-10, 10, -10] }} transition={{ duration: 8, repeat: Infinity }} />
                    
                    <svg className={styles.illustration} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Background Elements */}
                        <circle cx="250" cy="250" r="180" fill="#FABE24" fillOpacity="0.1" />
                        <rect x="380" y="150" width="40" height="40" rx="8" transform="rotate(15 380 150)" fill="#FF5722" fillOpacity="0.2" />
                        <path d="M100 150 L130 120 L160 150 Z" fill="#3B82F6" fillOpacity="0.2" />
                        
                        {/* Table */}
                        <rect x="100" y="380" width="300" height="12" rx="6" fill="#E2E8F0" />
                        
                        {/* Student sitting */}
                        {/* Hair/Head */}
                        <circle cx="250" cy="180" r="35" fill="#1E293B" />
                        <circle cx="250" cy="190" r="30" fill="#FFC9A9" />
                        
                        {/* Body/Shirt */}
                        <path d="M190 380 L310 380 L290 240 C 290 240 250 220 210 240 Z" fill="#3B82F6" />
                        
                        {/* Arms (Resting on table) */}
                        <path d="M190 320 C 170 320 150 350 150 380" stroke="#FFC9A9" strokeWidth="12" strokeLinecap="round" />
                        <path d="M310 320 C 330 320 350 350 350 380" stroke="#FFC9A9" strokeWidth="12" strokeLinecap="round" />
                        
                        {/* Books Stack */}
                        <rect x="160" y="350" width="80" height="15" rx="3" fill="#FFFFFF" stroke="#E2E8F0" />
                        <rect x="160" y="335" width="80" height="15" rx="3" fill="#3B82F6" />
                        <rect x="160" y="320" width="80" height="15" rx="3" fill="#FFFFFF" stroke="#E2E8F0" />
                        
                        {/* Smiles/Eyes (Engaged) */}
                        <circle cx="240" cy="185" r="2" fill="#1E293B" />
                        <circle cx="260" cy="185" r="2" fill="#1E293B" />
                        <path d="M242 200 C 242 200 250 208 258 200" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                    </svg>

                    <div className={styles.visualText}>
                        <h1>Pas de gâchis, juste du partage.</h1>
                        <p>Donnez une seconde vie à vos livres et économisez sur vos prochains semestres.</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Register Form */}
            <div className={styles.formSide}>
                <motion.div 
                    className={styles.registerCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className={styles.cardHeader}>
                        <BookInLogo size={32} />
                        <div className={styles.cardTitle}>
                            <h2>Créer un compte</h2>
                            <p>C'est gratuit et ça prend 2 minutes.</p>
                        </div>
                    </div>

                    <form onSubmit={handleRegister} className={styles.formSpace}>
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label>Prénom</label>
                                <div className={styles.field}>
                                    <User size={16} className={styles.fieldIcon} />
                                    <input type="text" name="prenom" placeholder="Ex: Omar" value={formData.prenom} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Nom</label>
                                <div className={styles.field}>
                                    <User size={16} className={styles.fieldIcon} />
                                    <input type="text" name="nom" placeholder="Ex: Benslim" value={formData.nom} onChange={handleInputChange} required />
                                </div>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Email Universitaire</label>
                            <div className={styles.field}>
                                <Mail size={16} className={styles.fieldIcon} />
                                <input type="email" name="email" placeholder="etudiant@univ.ma" value={formData.email} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label>Mot de passe</label>
                                <div className={styles.field}>
                                    <Lock size={16} className={styles.fieldIcon} />
                                    <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Confirmer</label>
                                <div className={styles.field}>
                                    <Lock size={16} className={styles.fieldIcon} />
                                    <input type="password" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange} required />
                                </div>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Filière & Établissement</label>
                            <div className={styles.inputRow}>
                                <div className={styles.field} style={{ flex: 1.5 }}>
                                    <GraduationCap size={16} className={styles.fieldIcon} />
                                    <input type="text" name="filiere" placeholder="Filière" value={formData.filiere} onChange={handleInputChange} required />
                                </div>
                                <div className={styles.field} style={{ flex: 1 }}>
                                    <Building2 size={16} className={styles.fieldIcon} />
                                    <input type="text" name="etablissement" placeholder="Fac" value={formData.etablissement} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                            {isLoading ? <Loader2 size={18} className={styles.spinning} /> : 'Créer mon compte'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className={styles.cardFooter}>
                        Vous avez déjà un compte ? <button onClick={() => navigate('/login')}>Se connecter</button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
