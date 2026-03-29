import React from 'react';
import { motion } from 'framer-motion';
import { BookUp, ArrowRightLeft, Gift, Zap, MapPin } from 'lucide-react';
import styles from './LiveFeed.module.css';

const ACTIVITIES = [
    {
        id: 1,
        type: 'échange',
        title: 'Échange réussi : Mathématiques L1',
        location: 'ENSIAS, Rabat',
        time: '5 min',
        icon: ArrowRightLeft,
        colorClass: styles.actionBlue,
        bgIcon: 'rgba(59, 130, 246, 0.08)'
    },
    {
        id: 2,
        type: 'don',
        title: 'Don de manuel : Anatomie Humaine',
        location: 'FMP, Fès',
        time: '12 min',
        icon: Gift,
        colorClass: styles.actionSuccess,
        bgIcon: 'rgba(16, 185, 129, 0.08)'
    },
    {
        id: 3,
        type: 'vente',
        title: 'Vente : Code Civil Marocain',
        location: 'Hassan II, Casablanca',
        time: '25 min',
        icon: BookUp,
        colorClass: styles.actionBrand,
        bgIcon: 'rgba(255, 87, 34, 0.08)'
    },
    {
        id: 4,
        type: 'échange',
        title: 'Échange : Économie Monétaire',
        location: 'FSJES, Settat',
        time: '45 min',
        icon: ArrowRightLeft,
        colorClass: styles.actionBlue,
        bgIcon: 'rgba(59, 130, 246, 0.08)'
    },
    {
        id: 5,
        type: 'don',
        title: 'Don : Thermodynamique L2',
        location: 'FST, Marrakech',
        time: '1h',
        icon: Gift,
        colorClass: styles.actionSuccess,
        bgIcon: 'rgba(16, 185, 129, 0.08)'
    },
    {
        id: 6,
        type: 'vente',
        title: 'Vente : Marketing Digital',
        location: 'ENCG, Agadir',
        time: '2h',
        icon: BookUp,
        colorClass: styles.actionBrand,
        bgIcon: 'rgba(255, 87, 34, 0.08)'
    }
];

export default function LiveFeed() {
    // Doubling activities for seamless loop
    const marqueeItems = [...ACTIVITIES, ...ACTIVITIES];

    return (
        <section className={styles.liveFeedSection}>
            <div className={styles.liveHeader}>
                <div className={styles.liveBadge} />
                <span className={styles.liveHeaderText}>En direct du campus</span>
            </div>

            <div className={styles.marqueeContainer}>
                <motion.div 
                    className={styles.marqueeTrack}
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                        duration: 35, // Slow, premium speed
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    whileHover={{ transition: { duration: 35 * 4, ease: "linear" } }} // Slow down more on hover instead of full stop for "sovereign" feel
                >
                    {marqueeItems.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                            <div key={`${activity.id}-${index}`} className={styles.activityCard}>
                                <div 
                                    className={styles.iconWrapper} 
                                    style={{ backgroundColor: activity.bgIcon }}
                                >
                                    <Icon size={20} className={activity.colorClass} strokeWidth={2.5} />
                                </div>
                                <div className={styles.cardContent}>
                                    <h4 className={styles.actionTitle}>{activity.title}</h4>
                                    <span className={styles.locationTime}>
                                        {activity.location} • Il y a {activity.time}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

