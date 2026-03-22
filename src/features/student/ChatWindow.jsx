import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, MoreVertical, Phone, Video, Info, Image as ImageIcon, Smile, Paperclip } from 'lucide-react';
import styles from './ChatWindow.module.css';

// ============================
// MOCK DATA
// ============================
const MOCK_CONTACTS = [
    { id: 1, name: 'Karim F.', avatar: 'K', lastMessage: 'Merci, à demain pour le livre !', time: '10:42', unread: 0, online: true },
    { id: 2, name: 'Sofia M.', avatar: 'S', lastMessage: 'Est-ce que le livre est toujours dispo ?', time: 'Hier', unread: 2, online: false },
    { id: 3, name: 'Youssef B.', avatar: 'Y', lastMessage: 'Ok ça marche.', time: 'Mar', unread: 0, online: true },
    { id: 4, name: 'Leila K.', avatar: 'L', lastMessage: 'Je suis devant la BU.', time: 'Lun', unread: 1, online: false },
    { id: 5, name: 'Ayoub H.', avatar: 'A', lastMessage: 'C\'est 150 DH dernier prix.', time: 'Dim', unread: 0, online: false },
];

const MOCK_MESSAGES = {
    1: [
        { id: 101, sender: 'them', text: 'Salut ! J\'ai vu ton annonce pour "Algorithmes Orientés Objet"', time: '10:30' },
        { id: 102, sender: 'me', text: 'Salut Karim ! Oui il est toujours disponible.', time: '10:35' },
        { id: 103, sender: 'them', text: 'Super. On peut se croiser à la fac demain ?', time: '10:38' },
        { id: 104, sender: 'me', text: 'Bien sûr, vers 14h à la cafétéria ?', time: '10:40' },
        { id: 105, sender: 'them', text: 'Merci, à demain pour le livre !', time: '10:42' },
    ],
    2: [
        { id: 201, sender: 'them', text: 'Est-ce que le livre est toujours dispo ?', time: 'Hier' }
    ]
};

export default function ChatWindow() {
    const [contacts, setContacts] = useState(MOCK_CONTACTS);
    const [selectedContact, setSelectedContact] = useState(MOCK_CONTACTS[0]);
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const activeMessages = messages[selectedContact.id] || [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeMessages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMsg = {
            id: Date.now(),
            sender: 'me',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => ({
            ...prev,
            [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg]
        }));
        
        // Update last message in contacts
        setContacts(prev => prev.map(c => 
            c.id === selectedContact.id 
                ? { ...c, lastMessage: inputText, time: newMsg.time, unread: 0 } 
                : c
        ));

        setInputText('');
    };

    return (
        <div className={styles.chatContainer}>
            {/* ====== LEFT: CONVERSATIONS LIST ====== */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>Messages</h2>
                    <div className={styles.searchWrap}>
                        <Search size={16} />
                        <input type="text" placeholder="Rechercher..." />
                    </div>
                </div>

                <div className={styles.contactList}>
                    {contacts.map(c => (
                        <div 
                            key={c.id} 
                            className={`${styles.contactCard} ${selectedContact.id === c.id ? styles.activeContact : ''}`}
                            onClick={() => setSelectedContact(c)}
                        >
                            <div className={styles.avatarWrap}>
                                <div className={styles.avatar}>{c.avatar}</div>
                                {c.online && <div className={styles.onlineBadge}></div>}
                            </div>
                            <div className={styles.contactInfo}>
                                <div className={styles.contactTop}>
                                    <strong>{c.name}</strong>
                                    <span>{c.time}</span>
                                </div>
                                <div className={styles.contactBottom}>
                                    <p className={c.unread > 0 ? styles.unreadText : ''}>{c.lastMessage}</p>
                                    {c.unread > 0 && <div className={styles.unreadBadge}>{c.unread}</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ====== RIGHT: CHAT AREA ====== */}
            <div className={styles.chatArea}>
                {selectedContact ? (
                    <>
                        <div className={styles.chatHeader}>
                            <div className={styles.chatHeaderInfo}>
                                <div className={styles.avatarWrap}>
                                    <div className={styles.avatar}>{selectedContact.avatar}</div>
                                    {selectedContact.online && <div className={styles.onlineBadge}></div>}
                                </div>
                                <div>
                                    <strong>{selectedContact.name}</strong>
                                    <span>{selectedContact.online ? 'En ligne' : 'Hors ligne'}</span>
                                </div>
                            </div>
                            <div className={styles.chatHeaderActions}>
                                <button><Phone size={18} /></button>
                                <button><Video size={18} /></button>
                                <button><Info size={18} /></button>
                            </div>
                        </div>

                        <div className={styles.chatMessages}>
                            <AnimatePresence>
                                {activeMessages.map((msg, index) => {
                                    const isMe = msg.sender === 'me';
                                    return (
                                        <motion.div 
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className={`${styles.messageRow} ${isMe ? styles.messageMe : styles.messageThem}`}
                                        >
                                            {!isMe && (
                                                <div className={styles.msgAvatar}>{selectedContact.avatar}</div>
                                            )}
                                            <div className={`${styles.bubble} ${isMe ? styles.bubbleMe : styles.bubbleThem}`}>
                                                {msg.text}
                                                <span className={styles.msgTime}>{msg.time}</span>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        <form className={styles.chatInputArea} onSubmit={handleSendMessage}>
                            <button type="button" className={styles.attachBtn}><Paperclip size={20} /></button>
                            <button type="button" className={styles.attachBtn}><ImageIcon size={20} /></button>
                            
                            <input 
                                type="text" 
                                placeholder="Écrivez votre message..." 
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            
                            <button type="button" className={styles.attachBtn}><Smile size={20} /></button>
                            <button type="submit" className={styles.sendBtn} disabled={!inputText.trim()}>
                                <Send size={18} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className={styles.emptyChat}>
                        <MessageSquare size={48} />
                        <h3>Vos Messages</h3>
                        <p>Sélectionnez une conversation pour commencer à discuter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
