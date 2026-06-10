import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { BACKEND_URL } from '../config';
import ProfileCard from '../components/Dashboard/ProfileCard';
import SavedReports from '../components/Dashboard/SavedReports';
import EmergencyHistory from '../components/Dashboard/EmergencyHistory';
import { Plus, Users, Phone, Trash2 } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, isMock } = useAuth();
  const { t } = useLanguage();

  // Trusted Contacts States
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [loadingContacts, setLoadingContacts] = useState(true);

  // Load contacts
  async function fetchContacts() {
    setLoadingContacts(true);
    const userUid = currentUser ? currentUser.uid : 'anonymous';

    if (!isMock && currentUser) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/contacts?userId=${userUid}`);
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
          setLoadingContacts(false);
          return;
        }
      } catch (error) {
        console.error("Failed to load contacts from API, trying mock fallback", error);
      }
    }

    // Fallback: Mock local storage contacts
    let mockContacts = JSON.parse(localStorage.getItem('safeher_mock_contacts') || '[]');
    
    // If empty, prefill with default contacts with women pics
    if (mockContacts.length === 0) {
      mockContacts = [
        {
          id: 'mock-contact-1',
          userId: userUid,
          name: "Prerna Singh",
          phone: "+91 9452012345",
          relationship: "Mother",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
          timestamp: new Date().toISOString()
        },
        {
          id: 'mock-contact-2',
          userId: userUid,
          name: "Dr. Ananya Verma",
          phone: "+91 9415054321",
          relationship: "Sister",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
          timestamp: new Date().toISOString()
        },
        {
          id: 'mock-contact-3',
          userId: userUid,
          name: "Kirti Mishra",
          phone: "+91 9889078654",
          relationship: "Friend",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
          timestamp: new Date().toISOString()
        }
      ];
      localStorage.setItem('safeher_mock_contacts', JSON.stringify(mockContacts));
    }
    
    const filtered = mockContacts.filter(c => c.userId === userUid || c.user_id === userUid);
    setContacts(filtered);
    setLoadingContacts(false);
  }

  useEffect(() => {
    fetchContacts();
  }, [currentUser, isMock]);

  // Add Contact
  async function handleAddContact(e) {
    e.preventDefault();
    if (!name || !phone || !relationship) return;

    const femaleAvatars = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100'
    ];
    const randomAvatar = femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];
    const userUid = currentUser ? currentUser.uid : 'anonymous';

    const contactData = {
      userId: userUid,
      name,
      phone,
      relationship,
      avatar: randomAvatar
    };

    if (!isMock) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contactData)
        });
        if (response.ok) {
          fetchContacts();
          setName('');
          setPhone('');
          setRelationship('');
          return;
        }
      } catch (error) {
        console.error("Failed to add contact via API, trying mock fallback", error);
      }
    }

    // Mock Save Fallback
    const mockContacts = JSON.parse(localStorage.getItem('safeher_mock_contacts') || '[]');
    const newContact = {
      id: 'mock-contact-id-' + Math.random().toString(36).substr(2, 9),
      userId: userUid,
      ...contactData,
      timestamp: new Date().toISOString()
    };
    mockContacts.push(newContact);
    localStorage.setItem('safeher_mock_contacts', JSON.stringify(mockContacts));

    fetchContacts();
    // Reset inputs
    setName('');
    setPhone('');
    setRelationship('');
  }

  // Delete Contact
  async function handleDeleteContact(contactId) {
    if (!isMock) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/contacts/${contactId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchContacts();
          return;
        }
      } catch (error) {
        console.error("Failed to delete contact via API, trying mock fallback", error);
      }
    }

    // Mock Delete Fallback
    const mockContacts = JSON.parse(localStorage.getItem('safeher_mock_contacts') || '[]');
    const filtered = mockContacts.filter(c => c.id !== contactId);
    localStorage.setItem('safeher_mock_contacts', JSON.stringify(filtered));
    fetchContacts();
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8 font-body">
      
      {/* Page Header */}
      <div className="text-left border-b border-slate-200 dark:border-pink-500/10 pb-4">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-800 dark:text-white">
          {t('dashboard.title')}
        </h1>
        <p className="text-xs text-slate-500 dark:text-[#a89ec4] mt-1 leading-normal">
          {t('dashboard.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Profile Widget & Add Contact Form */}
        <div className="flex flex-col gap-6">
          <ProfileCard />

          {/* Add Contact Form Card */}
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl transition-all duration-300">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-4 flex items-center gap-1.5">
              <Plus className="h-4.5 w-4.5" />
              <span>{t('dashboard.btnNewContact')}</span>
            </h3>

            <form onSubmit={handleAddContact} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white" 
                  placeholder="e.g. Guardian Name"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t('dashboard.labelPhone')}</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white" 
                  placeholder="e.g. +91 9999999999"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t('dashboard.labelRel')}</label>
                <input 
                  type="text" 
                  value={relationship} 
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white" 
                  placeholder="e.g. Mother, Brother, Friend"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-md shadow-pink-500/10"
              >
                Save Member
              </button>
            </form>
          </div>
        </div>

        {/* Right Side Grid: Contacts Circles & Incident logs */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Contacts Circle Grid */}
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl transition-all duration-300">
            <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
              <Users className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              <span>{t('dashboard.contactsTitle')}</span>
            </h3>

            {loadingContacts ? (
              <div className="text-center py-6 text-xs text-slate-500">{t('emergency.loadingMap')}</div>
            ) : contacts.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-[#a89ec4]/60 py-6 text-center">{t('dashboard.noContacts')}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[220px] overflow-y-auto custom-scroll pr-1">
                {contacts.map((contact) => (
                  <div key={contact.id} className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl flex justify-between items-center group hover:border-pink-500/30 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/25 flex-shrink-0 bg-pink-500/10">
                        <img 
                          src={contact.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
                          alt={contact.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100';
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-xs text-slate-800 dark:text-white">
                          {contact.name}
                        </h4>
                        <p className="text-[10px] text-pink-500 font-semibold">{contact.relationship}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a 
                        href={`tel:${contact.phone}`}
                        className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors cursor-pointer"
                        title={t('dashboard.btnCall')}
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                      <button 
                        onClick={() => handleDeleteContact(contact.id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
                        title={t('dashboard.btnDelete')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmergencyHistory />
            <SavedReports />
          </div>

        </div>

      </div>

    </div>
  );
}
