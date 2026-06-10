import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { BACKEND_URL } from '../config';
import { ShieldAlert, Users, FileText, AlertTriangle, ArrowLeft, Trash2, CheckCircle2, Eye, Search } from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser, isMock } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Redirect if not admin
  const isAdmin = currentUser && currentUser.email && currentUser.email.toLowerCase().includes('admin');

  // Tab management: 'complaints' | 'sos' | 'contacts'
  const [activeTab, setActiveTab] = useState('complaints');

  // Data states
  const [complaints, setComplaints] = useState([]);
  const [sosLogs, setSosLogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all system logs
  async function fetchSystemData() {
    setLoading(true);
    
    if (!isMock) {
      try {
        // 1. Fetch complaints
        const reportsRes = await fetch(`${BACKEND_URL}/api/incidents`);
        let reportsList = [];
        if (reportsRes.ok) {
          reportsList = await reportsRes.json();
        }
        setComplaints(reportsList);

        // 2. Fetch SOS alerts
        const sosRes = await fetch(`${BACKEND_URL}/api/sos`);
        let sosList = [];
        if (sosRes.ok) {
          sosList = await sosRes.json();
        }
        setSosLogs(sosList);

        // 3. Fetch contacts
        const contactsRes = await fetch(`${BACKEND_URL}/api/contacts?userId=all`);
        let contactsList = [];
        if (contactsRes.ok) {
          contactsList = await contactsRes.json();
        }
        setContacts(contactsList);

        // 4. Set standard user count
        setUserCount(15);
        setLoading(false);
        return;
      } catch (error) {
        console.error("Failed to load admin data from API, using mock fallback", error);
      }
    }

    // Fallback Mock Storage Mode
    const mockReports = JSON.parse(localStorage.getItem('safeher_mock_reports') || '[]');
    setComplaints(mockReports);

    const mockSOS = JSON.parse(localStorage.getItem('safeher_mock_alerts') || '[]');
    setSosLogs(mockSOS);

    const mockContacts = JSON.parse(localStorage.getItem('safeher_mock_contacts') || '[]');
    setContacts(mockContacts);

    const mockUsers = JSON.parse(localStorage.getItem('safeher_mock_users') || '[]');
    setUserCount(mockUsers.length + 1); // +1 for the admin itself
    
    setLoading(false);
  }

  useEffect(() => {
    if (isAdmin) {
      fetchSystemData();
    }
  }, [currentUser, isMock]);

  // Update status of a report (complaint)
  async function handleUpdateComplaintStatus(id, newStatus) {
    if (!isMock) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/incidents/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        if (response.ok) {
          fetchSystemData();
          return;
        }
      } catch (e) {
        console.error("Failed to update status via API", e);
      }
    }

    // Mock update
    const mockReports = JSON.parse(localStorage.getItem('safeher_mock_reports') || '[]');
    const updated = mockReports.map(r => r.id === id ? { ...r, status: newStatus } : r);
    localStorage.setItem('safeher_mock_reports', JSON.stringify(updated));
    fetchSystemData();
  }

  // Delete an incident report
  async function handleDeleteComplaint(id) {
    if (window.confirm("Are you sure you want to delete this incident record?")) {
      if (!isMock) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/incidents/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            fetchSystemData();
            return;
          }
        } catch (e) {
          console.error("Failed to delete incident via API", e);
        }
      }

      // Mock Delete
      const mockReports = JSON.parse(localStorage.getItem('safeher_mock_reports') || '[]');
      const filtered = mockReports.filter(r => r.id !== id);
      localStorage.setItem('safeher_mock_reports', JSON.stringify(filtered));
      fetchSystemData();
    }
  }

  // Update SOS status (Active -> Resolved)
  async function handleResolveSOS(id, timestamp) {
    if (!isMock) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/sos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'resolved' })
        });
        if (response.ok) {
          fetchSystemData();
          return;
        }
      } catch (e) {
        console.error("Failed to resolve SOS via API", e);
      }
    }

    // Mock resolve fallback
    const mockSOS = JSON.parse(localStorage.getItem('safeher_mock_alerts') || '[]');
    const updated = mockSOS.map(a => a.timestamp === timestamp ? { ...a, status: 'resolved' } : a);
    localStorage.setItem('safeher_mock_alerts', JSON.stringify(updated));
    fetchSystemData();
  }

  // Delete SOS alert log entry
  async function handleDeleteSOS(id, timestamp) {
    if (window.confirm("Archive or delete this SOS alert entry?")) {
      if (!isMock) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/sos/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            fetchSystemData();
            return;
          }
        } catch (e) {
          console.error("Failed to delete SOS via API", e);
        }
      }

      // Mock Delete fallback
      const mockSOS = JSON.parse(localStorage.getItem('safeher_mock_alerts') || '[]');
      const filtered = mockSOS.filter(a => a.timestamp !== timestamp);
      localStorage.setItem('safeher_mock_alerts', JSON.stringify(filtered));
      fetchSystemData();
    }
  }

  // Delete contact directory entry
  async function handleDeleteContact(id) {
    if (window.confirm("Remove this trusted contact?")) {
      if (!isMock) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/contacts/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            fetchSystemData();
            return;
          }
        } catch (e) {
          console.error("Failed to delete contact via API", e);
        }
      }

      // Mock delete fallback
      const mockContacts = JSON.parse(localStorage.getItem('safeher_mock_contacts') || '[]');
      const filtered = mockContacts.filter(c => c.id !== id);
      localStorage.setItem('safeher_mock_contacts', JSON.stringify(filtered));
      fetchSystemData();
    }
  }

  if (!isAdmin) {
    return (
      <div className="w-full max-w-md mx-auto py-20 px-4 text-center flex flex-col items-center gap-6 font-body">
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full animate-bounce">
          <ShieldAlert className="h-12 w-12" />
        </div>
        <h2 className="font-heading font-black text-2xl text-slate-800 dark:text-white">ACCESS DENIED</h2>
        <p className="text-xs text-slate-500 dark:text-[#a89ec4] leading-relaxed">
          This panel is restricted to system administrators. Log in with admin permissions to utilize the central dispatch commands.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-1.5 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Authentication</span>
        </button>
      </div>
    );
  }

  // Filter lists based on search bar
  const queryLow = searchQuery.toLowerCase();
  
  const filteredComplaints = complaints.filter(c => 
    (c.category || '').toLowerCase().includes(queryLow) || 
    (c.location || '').toLowerCase().includes(queryLow) || 
    (c.description || '').toLowerCase().includes(queryLow) || 
    (c.userName || c.user_name || '').toLowerCase().includes(queryLow)
  );

  const filteredSOS = sosLogs.filter(s => 
    (s.userName || s.user_name || '').toLowerCase().includes(queryLow) || 
    (s.userEmail || s.user_email || '').toLowerCase().includes(queryLow) ||
    (s.status || '').toLowerCase().includes(queryLow)
  );

  const filteredContacts = contacts.filter(co => 
    (co.name || '').toLowerCase().includes(queryLow) || 
    (co.phone || '').toLowerCase().includes(queryLow) ||
    (co.relationship || '').toLowerCase().includes(queryLow)
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8 font-body">
      
      {/* Page Title */}
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-pink-500/10 pb-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="h-7 w-7 text-pink-500 animate-pulse" />
            <span>Admin Command Center</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-[#a89ec4] mt-1">
            Monitor emergency dispatches, incident reports, and system configurations.
          </p>
        </div>
        
        <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-600 dark:text-pink-400">
          Admin Session
        </span>
      </div>

      {/* Summary Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1: Total SOS */}
        <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 bg-red-500/10 text-red-500 rounded-xl">
            <AlertTriangle className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total SOS Alerts</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white font-mono">{sosLogs.length}</span>
          </div>
        </div>

        {/* Card 2: Total Reports */}
        <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 bg-pink-500/10 text-pink-500 rounded-xl">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Complaints</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white font-mono">{complaints.length}</span>
          </div>
        </div>

        {/* Card 3: Total Users */}
        <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registered Users</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white font-mono">{userCount}</span>
          </div>
        </div>
      </div>

      {/* Tabs and Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-3 rounded-2xl shadow-lg">
        
        {/* Tab Buttons */}
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => { setActiveTab('complaints'); setSearchQuery(''); }}
            className={`flex-1 md:flex-none py-2 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs transition-colors cursor-pointer ${
              activeTab === 'complaints'
                ? 'bg-pink-600 text-white shadow-md'
                : 'text-slate-500 dark:text-[#a89ec4] hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Complaints Logs</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('sos'); setSearchQuery(''); }}
            className={`flex-1 md:flex-none py-2 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs transition-colors cursor-pointer ${
              activeTab === 'sos'
                ? 'bg-pink-600 text-white shadow-md'
                : 'text-slate-500 dark:text-[#a89ec4] hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>SOS Dispatches</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('contacts'); setSearchQuery(''); }}
            className={`flex-1 md:flex-none py-2 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs transition-colors cursor-pointer ${
              activeTab === 'contacts'
                ? 'bg-pink-600 text-white shadow-md'
                : 'text-slate-500 dark:text-[#a89ec4] hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Guardians Circle</span>
          </button>
        </div>

        {/* Local Search Query Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records in active list..."
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Main List Table Area */}
      <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 rounded-2xl shadow-xl overflow-hidden">
        
        {loading ? (
          <div className="text-center py-12 text-xs text-slate-500 animate-pulse">Syncing administrative database records...</div>
        ) : activeTab === 'complaints' ? (
          /* TAB 1: COMPLAINTS DESK */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#160913]/85 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-white/5">
                  <th className="p-4">Reporting User</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Location</th>
                  <th className="p-4 w-1/3">Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-100">
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-400">No incident reports logged.</td>
                  </tr>
                ) : (
                  filteredComplaints.map((comp) => (
                    <tr key={comp.id} className="hover:bg-slate-50/50 dark:hover:bg-pink-500/5 transition-colors">
                      <td className="p-4 font-semibold">
                        <div className="flex flex-col">
                          <span>{comp.userName || comp.user_name || 'Anonymous'}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{comp.anonymous ? 'Anonymous Mode' : (comp.userEmail || comp.user_email)}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-500 font-bold text-[9px] uppercase tracking-wide">
                          {comp.category || 'Harassment'}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[10px]">{comp.location}</td>
                      <td className="p-4 text-slate-500 dark:text-slate-300 leading-normal max-w-sm">
                        <p className="line-clamp-2" title={comp.description}>{comp.description}</p>
                        {(comp.evidenceUrl || comp.evidence_url) && (
                          <a href={comp.evidenceUrl || comp.evidence_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-1 text-[10px] text-pink-500 hover:underline font-bold">
                            <Eye className="h-3.5 w-3.5" />
                            <span>View Attachment Evidence</span>
                          </a>
                        )}
                      </td>
                      <td className="p-4">
                        <select
                          value={comp.status || 'Pending'}
                          onChange={(e) => handleUpdateComplaintStatus(comp.id, e.target.value)}
                          className="text-[10px] font-bold p-1 bg-slate-50 dark:bg-[#160913] border border-slate-200 dark:border-white/10 rounded focus:outline-none cursor-pointer text-slate-800 dark:text-white"
                        >
                          <option value="Pending">Pending Review</option>
                          <option value="Investigating">Investigating Case</option>
                          <option value="Resolved">Resolved Case</option>
                        </select>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteComplaint(comp.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Report Record"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'sos' ? (
          /* TAB 2: SOS ALERTS LOG */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#160913]/85 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-white/5">
                  <th className="p-4">Triggering User</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">GPS Location</th>
                  <th className="p-4">Alarm Status</th>
                  <th className="p-4 text-center">Resolve Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-100">
                {filteredSOS.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-400">No emergency alerts logged.</td>
                  </tr>
                ) : (
                  filteredSOS.map((sos, index) => (
                    <tr key={sos.id || index} className="hover:bg-slate-50/50 dark:hover:bg-pink-500/5 transition-colors">
                      <td className="p-4 font-semibold">
                        <div className="flex flex-col">
                          <span>{sos.userName || sos.user_name || 'Anonymous User'}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{sos.userEmail || sos.user_email}</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-[10px]">{new Date(sos.created_at || sos.timestamp).toLocaleString()}</td>
                      <td className="p-4">
                        {sos.latitude && sos.longitude ? (
                          <a
                             href={`https://maps.google.com/?q=${sos.latitude},${sos.longitude}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-pink-600 dark:text-pink-400 font-mono text-[10px] hover:underline font-bold"
                          >
                            Lat: {sos.latitude} | Lon: {sos.longitude}
                          </a>
                        ) : (
                          <span className="text-slate-400">GPS Denied</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wide ${
                          sos.status === 'resolved'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-red-500/15 text-red-500 animate-pulse'
                        }`}>
                          {sos.status || 'Active'}
                        </span>
                      </td>
                      <td className="p-4 text-center flex justify-center gap-2">
                        {sos.status !== 'resolved' && (
                          <button
                            onClick={() => handleResolveSOS(sos.id, sos.timestamp)}
                            className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Mark Alert Resolved"
                          >
                            <CheckCircle2 className="h-4.5 w-4.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteSOS(sos.id, sos.timestamp)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Alert Record"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* TAB 3: CONTACTS DIRECTORY */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#160913]/85 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-white/5">
                  <th className="p-4">Guardian Name</th>
                  <th className="p-4">Relationship</th>
                  <th className="p-4">Contact Phone</th>
                  <th className="p-4">System Account ID</th>
                  <th className="p-4 text-center">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-100">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-400">No contact logs registered in database.</td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-slate-50/50 dark:hover:bg-pink-500/5 transition-colors">
                      <td className="p-4 font-semibold">{contact.name}</td>
                      <td className="p-4 font-bold text-[10px] text-pink-600 dark:text-pink-400 uppercase tracking-wide">{contact.relationship}</td>
                      <td className="p-4 font-mono font-bold text-slate-800 dark:text-white">{contact.phone}</td>
                      <td className="p-4 font-mono text-[9px] text-slate-400">{contact.userId || contact.user_id || 'anonymous'}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Contact Entry"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
