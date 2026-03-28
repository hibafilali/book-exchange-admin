import { useState } from 'react';
import { User, Shield, Info, Bell, Save, Globe } from 'lucide-react';
import styles from './Settings.module.css';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('Profile');

    const tabs = [
        { id: 'Profile', label: 'Mon Profil', icon: User },
        { id: 'Security', label: 'Sécurité', icon: Shield },
        { id: 'App', label: 'Application', icon: Globe },
        { id: 'Notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Paramètres</h1>
                    <p className={styles.subtitle}>Configurez votre profil et les paramètres système.</p>
                </div>
            </header>

            <div className={styles.content}>
                <aside className={styles.sidebar}>
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <Icon size={20} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </aside>

                <main className={`glass-panel ${styles.mainBoard}`}>
                    <div className={styles.tabContent}>
                        <h2 className={styles.tabTitle}>{tabs.find(t => t.id === activeTab)?.label}</h2>

                        <div className={styles.formContainer}>
                            {activeTab === 'Profile' && (
                                <div className={styles.formSection}>
                                    <div className={styles.inputGroup}>
                                        <label>Nom complet</label>
                                        <input type="text" defaultValue="Admin Demo" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Email professionnel</label>
                                        <input type="email" defaultValue="admin@ytera.ma" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Rôle</label>
                                        <input type="text" defaultValue="Superadministrateur" disabled />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Security' && (
                                <div className={styles.formSection}>
                                    <div className={styles.inputGroup}>
                                        <label>Mot de passe actuel</label>
                                        <input type="password" placeholder="••••••••" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Nouveau mot de passe</label>
                                        <input type="password" placeholder="••••••••" />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'App' && (
                                <div className={styles.formSection}>
                                    <div className={styles.toggleGroup}>
                                        <span>Maintenance du site</span>
                                        <label className={styles.switch}>
                                            <input type="checkbox" />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                    <div className={styles.toggleGroup}>
                                        <span>Inscriptions ouvertes</span>
                                        <label className={styles.switch}>
                                            <input type="checkbox" defaultChecked />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Notifications' && (
                                <div className={styles.formSection}>
                                    <div className={styles.toggleGroup}>
                                        <span>Alertes email (nouveaux signalements)</span>
                                        <label className={styles.switch}>
                                            <input type="checkbox" defaultChecked />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                    <div className={styles.toggleGroup}>
                                        <span>Notifications push (annonces en attente)</span>
                                        <label className={styles.switch}>
                                            <input type="checkbox" defaultChecked />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                    <div className={styles.toggleGroup}>
                                        <span>Récapitulatif hebdomadaire</span>
                                        <label className={styles.switch}>
                                            <input type="checkbox" />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            <button className={styles.saveBtn}>
                                <Save size={18} /> Enregistrer les modifications
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
