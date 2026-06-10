const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

// Initialize Environment Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Support base64 image uploads

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;
const isSupabaseConfigured = supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_url_here';

if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Successfully initialized connection to Supabase database.');
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
  }
} else {
  console.warn(
    'WARNING: Supabase credentials are not configured. Backend will operate in local memory mock mode.'
  );
}

// In-Memory Database Fallbacks for Offline Testing
const mockDB = {
  contacts: [
    {
      id: 'mock-contact-1',
      user_id: 'anonymous',
      name: "Prerna Singh",
      phone: "+91 9452012345",
      relationship: "Mother",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-contact-2',
      user_id: 'anonymous',
      name: "Dr. Ananya Verma",
      phone: "+91 9415054321",
      relationship: "Sister",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      created_at: new Date().toISOString()
    }
  ],
  sosAlerts: [],
  incidents: []
};

// --- API ROUTES ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: isSupabaseConfigured ? 'supabase' : 'in-memory-mock',
    timestamp: new Date()
  });
});

// 1. TRUSTED CONTACTS ENDPOINTS
// GET contacts
app.get('/api/contacts', async (req, res) => {
  const userId = req.query.userId;
  
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('trusted_contacts').select('*').order('created_at', { ascending: false });
      if (userId && userId !== 'all') {
        query = query.eq('user_id', userId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return res.json(data || []);
    } catch (error) {
      console.error('Supabase query failed, falling back to mock database:', error.message);
    }
  }

  // Fallback
  const filtered = userId && userId !== 'all' ? mockDB.contacts.filter(c => c.user_id === userId) : mockDB.contacts;
  res.json(filtered);
});

// POST contact
app.post('/api/contacts', async (req, res) => {
  const { userId, name, phone, relationship, avatar } = req.body;
  if (!name || !phone || !relationship) {
    return res.status(400).json({ error: 'Name, phone, and relationship are required.' });
  }

  const newContact = {
    user_id: userId || 'anonymous',
    name,
    phone,
    relationship,
    avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('trusted_contacts')
        .insert([newContact])
        .select();
        
      if (error) throw error;
      return res.status(201).json(data[0]);
    } catch (error) {
      console.error('Supabase insert failed, falling back to mock database:', error.message);
    }
  }

  // Fallback
  const mockContact = {
    id: 'mock-contact-' + Math.random().toString(36).substr(2, 9),
    ...newContact,
    created_at: new Date().toISOString()
  };
  mockDB.contacts.push(mockContact);
  res.status(201).json(mockContact);
});

// DELETE contact
app.delete('/api/contacts/:id', async (req, res) => {
  const contactId = req.params.id;

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('trusted_contacts')
        .delete()
        .eq('id', contactId);
        
      if (error) throw error;
      return res.json({ success: true, message: 'Contact deleted successfully.' });
    } catch (error) {
      console.error('Supabase delete failed, falling back to mock database:', error.message);
    }
  }

  // Fallback
  const index = mockDB.contacts.findIndex(c => c.id === contactId);
  if (index !== -1) {
    mockDB.contacts.splice(index, 1);
    return res.json({ success: true, message: 'Mock contact deleted.' });
  }
  res.status(404).json({ error: 'Contact not found.' });
});


// 2. SOS ALERTS ENDPOINTS
// GET SOS alerts (for dashboard or logs)
app.get('/api/sos', async (req, res) => {
  const userId = req.query.userId;
  
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('sos_alerts').select('*').order('created_at', { ascending: false });
      if (userId) {
        query = query.eq('user_id', userId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return res.json(data || []);
    } catch (error) {
      console.error('Supabase query failed, falling back to mock database:', error.message);
    }
  }

  // Fallback
  const filtered = userId ? mockDB.sosAlerts.filter(a => a.user_id === userId) : mockDB.sosAlerts;
  res.json(filtered);
});

// POST SOS alert
app.post('/api/sos', async (req, res) => {
  const { userId, userEmail, userName, latitude, longitude, status } = req.body;

  const newAlert = {
    user_id: userId || 'anonymous',
    user_email: userEmail || 'anonymous@safeher.org',
    user_name: userName || 'Anonymous User',
    latitude: latitude || null,
    longitude: longitude || null,
    status: status || 'active'
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('sos_alerts')
        .insert([newAlert])
        .select();
        
      if (error) throw error;
      return res.status(201).json(data[0]);
    } catch (error) {
      console.error('Supabase insert failed, falling back to mock database:', error.message);
    }
  }

  // Fallback
  const mockAlert = {
    id: 'mock-sos-' + Math.random().toString(36).substr(2, 9),
    ...newAlert,
    created_at: new Date().toISOString()
  };
  mockDB.sosAlerts.unshift(mockAlert);
  res.status(201).json(mockAlert);
});

// PUT update SOS status (e.g. resolve)
app.put('/api/sos/:id', async (req, res) => {
  const alertId = req.params.id;
  const { status } = req.body;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('sos_alerts')
        .update({ status })
        .eq('id', alertId)
        .select();
        
      if (error) throw error;
      return res.json(data[0]);
    } catch (error) {
      console.error('Supabase update failed, falling back to mock database:', error.message);
    }
  }

  // Fallback
  const alert = mockDB.sosAlerts.find(a => a.id === alertId);
  if (alert) {
    alert.status = status;
    return res.json(alert);
  }
  res.status(404).json({ error: 'SOS alert not found.' });
});

// DELETE SOS alert log
app.delete('/api/sos/:id', async (req, res) => {
  const alertId = req.params.id;

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('sos_alerts')
        .delete()
        .eq('id', alertId);
        
      if (error) throw error;
      return res.json({ success: true, message: 'SOS log deleted successfully.' });
    } catch (error) {
      console.error('Supabase delete failed, falling back to mock database:', error.message);
    }
  }

  // Fallback
  const index = mockDB.sosAlerts.findIndex(a => a.id === alertId);
  if (index !== -1) {
    mockDB.sosAlerts.splice(index, 1);
    return res.json({ success: true });
  }
  res.status(404).json({ error: 'Alert log not found.' });
});


// 3. INCIDENT REPORTS ENDPOINTS
// GET incident reports
app.get('/api/incidents', async (req, res) => {
  const userId = req.query.userId;

  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('incident_reports').select('*').order('created_at', { ascending: false });
      if (userId) {
        query = query.eq('user_id', userId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return res.json(data || []);
    } catch (error) {
      console.error('Supabase query failed, falling back to mock database:', error.message);
    }
  }

  // Fallback
  const filtered = userId ? mockDB.incidents.filter(i => i.user_id === userId) : mockDB.incidents;
  res.json(filtered);
});

// POST incident report
app.post('/api/incidents', async (req, res) => {
  const { userId, userEmail, userName, description, location, category, anonymous, evidenceUrl } = req.body;
  if (!description || !location || !category) {
    return res.status(400).json({ error: 'Description, location, and category are required.' });
  }

  const newIncident = {
    user_id: userId || 'anonymous',
    user_email: anonymous ? 'anonymous' : (userEmail || 'anonymous'),
    user_name: anonymous ? 'Anonymous' : (userName || 'Anonymous'),
    description,
    location,
    category,
    anonymous: !!anonymous,
    evidence_url: evidenceUrl || ''
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('incident_reports')
        .insert([newIncident])
        .select();
        
      if (error) throw error;
      return res.status(201).json(data[0]);
    } catch (error) {
      console.error('Supabase insert failed, falling back to mock database:', error.message);
    }
  }

  // Fallback
  const mockIncident = {
    id: 'mock-incident-' + Math.random().toString(36).substr(2, 9),
    ...newIncident,
    created_at: new Date().toISOString()
  };
  mockDB.incidents.unshift(mockIncident);
  res.status(201).json(mockIncident);
});

// PUT update incident status (e.g. status)
app.put('/api/incidents/:id', async (req, res) => {
  const incidentId = req.params.id;
  const { status } = req.body;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('incident_reports')
        .update({ status })
        .eq('id', incidentId)
        .select();
        
      if (error) throw error;
      return res.json(data[0]);
    } catch (error) {
      console.error('Supabase update failed, falling back to mock database:', error.message);
    }
  }

  // Fallback
  const incident = mockDB.incidents.find(i => i.id === incidentId);
  if (incident) {
    incident.status = status;
    return res.json(incident);
  }
  res.status(404).json({ error: 'Incident report not found.' });
});

// DELETE incident report
app.delete('/api/incidents/:id', async (req, res) => {
  const incidentId = req.params.id;

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('incident_reports')
        .delete()
        .eq('id', incidentId);
        
      if (error) throw error;
      return res.json({ success: true, message: 'Incident report deleted.' });
    } catch (error) {
      console.error('Supabase delete failed, falling back to mock database:', error.message);
    }
  }

  // Fallback
  const index = mockDB.incidents.findIndex(i => i.id === incidentId);
  if (index !== -1) {
    mockDB.incidents.splice(index, 1);
    return res.json({ success: true });
  }
  res.status(404).json({ error: 'Report not found.' });
});

// Run server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` Women Safety API Backend is running!`);
  console.log(` Access locally at: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
