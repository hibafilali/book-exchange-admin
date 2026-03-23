import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import styles from './SplashScreen.module.css';

export default function SplashScreen() {
    return (
        <div className={styles.splashContainer}>
            <motion.div 
                className={styles.glassCircle}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >
                <div className={styles.iconWrap}>
                    <BookOpen size={48} className={styles.logoIcon} strokeWidth={1.5} />
                </div>
                <motion.div 
                    className={styles.spinnerTrack}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
            </motion.div>
            <motion.h2 
                className={styles.loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                BOOK-IN
            </motion.h2>
        </div>
    );
}
