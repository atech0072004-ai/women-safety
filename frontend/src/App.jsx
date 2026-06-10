import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

// Common Components
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import SupportChat from './components/Common/SupportChat';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Emergency from './pages/Emergency';
import Dashboard from './pages/Dashboard';
import ReportIncident from './pages/ReportIncident';
import SafetyTips from './pages/SafetyTips';
import SafetyChecklist from './pages/SafetyChecklist';
import FakeCall from './pages/FakeCall';
import Contact from './pages/Contact';
import LoginRegister from './pages/LoginRegister';
import PoliceHelplines from './pages/PoliceHelplines';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin Protected Route Wrapper
const AdminProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  const isAdmin = currentUser.email && currentUser.email.toLowerCase().includes('admin');
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-[#fdf2f8] dark:bg-[#160913] text-slate-800 dark:text-slate-100 transition-colors duration-300">
              
              {/* Common Header Navbar */}
              <Navbar />

              {/* Main Content Render Box */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/emergency" element={<Emergency />} />
                  <Route path="/helplines" element={<PoliceHelplines />} />
                  
                  {/* Protected Screens */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />

                  <Route path="/admin" element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  } />
                  
                  <Route path="/report" element={<ReportIncident />} />
                  <Route path="/tips" element={<SafetyTips />} />
                  <Route path="/checklist" element={<SafetyChecklist />} />
                  <Route path="/fakecall" element={<FakeCall />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<LoginRegister />} />
                  
                  {/* Wildcard Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Common Footer */}
              <Footer />

              {/* Global Collapsible Assist Chatbot */}
              <SupportChat />

            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
