import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { BACKEND_URL } from '../config';
import { FileText, Image as ImageIcon, UserCheck, EyeOff } from 'lucide-react';

export default function ReportIncident() {
  const { currentUser, isMock } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Form states
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Street Harassment');
  const [anonymous, setAnonymous] = useState(false);
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [evidencePreview, setEvidencePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle image attachment
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvidenceFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEvidencePreview(reader.result); // Data URL preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit report
  async function handleSubmit(e) {
    e.preventDefault();
    if (!description || !location) return;

    setSubmitting(true);
    let evidenceUrl = '';

    try {
      // 1. Handle image upload to Supabase Storage if configured
      if (!isMock && isSupabaseConfigured && supabase && evidenceFile) {
        try {
          const fileExt = evidenceFile.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 5)}.${fileExt}`;
          const filePath = `evidence/${fileName}`;

          const { data, error } = await supabase.storage
            .from('incident_evidence')
            .upload(filePath, evidenceFile);
          
          if (error) {
            console.error("Supabase Storage upload failed, trying base64 fallback", error);
            evidenceUrl = evidencePreview;
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('incident_evidence')
              .getPublicUrl(filePath);
            evidenceUrl = publicUrl;
          }
        } catch (uploadErr) {
          console.error("Storage upload exception", uploadErr);
          evidenceUrl = evidencePreview;
        }
      } else if (evidencePreview) {
        // Mock mode: Keep the base64 data url as the image source!
        evidenceUrl = evidencePreview;
      }

      // 2. Prepare report details
      const reportData = {
        userId: currentUser ? currentUser.uid : 'anonymous',
        userEmail: anonymous ? 'anonymous' : (currentUser ? currentUser.email : 'anonymous'),
        userName: anonymous ? 'Anonymous' : (currentUser ? currentUser.displayName : 'Anonymous'),
        description,
        location,
        category,
        anonymous,
        evidenceUrl
      };

      // 3. Save report
      if (!isMock) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/incidents`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportData)
          });
          if (response.ok) {
            setSuccess(true);
            setTimeout(() => {
              navigate('/dashboard');
            }, 2000);
            return;
          }
        } catch (error) {
          console.error("Failed to post incident via API, falling back to local storage", error);
        }
      }

      // Save to mock database
      const mockReports = JSON.parse(localStorage.getItem('safeher_mock_reports') || '[]');
      mockReports.unshift({
        id: 'mock-report-id-' + Math.random().toString(36).substr(2, 9),
        ...reportData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('safeher_mock_reports', JSON.stringify(mockReports));

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error("Incident report filing failed", error);
      alert(t('alerts.failReport'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 font-body">
      
      {/* Success Modal Panel */}
      {success ? (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl text-center flex flex-col items-center gap-4 shadow-xl">
          <div className="p-4 bg-emerald-500 text-white rounded-full">
            <UserCheck className="h-10 w-10" />
          </div>
          <h2 className="font-heading font-extrabold text-xl text-emerald-500">Report Logged Successfully</h2>
          <p className="text-xs text-slate-500 dark:text-[#a89ec4] max-w-sm">
            Your safety report has been registered. You are being redirected to your dashboard command center...
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="text-center flex flex-col gap-2">
            <h1 className="font-heading font-extrabold text-3xl text-slate-800 dark:text-white uppercase tracking-wider">
              {t('report.title')}
            </h1>
            <p className="text-xs text-slate-500 dark:text-[#a89ec4] max-w-md mx-auto leading-normal">
              {t('report.subtitle')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex flex-col gap-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {t('report.labelCategory')}
                </label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs p-3.5 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white cursor-pointer"
                >
                  <option value="Street Harassment">{t('report.catHarassment')}</option>
                  <option value="Stalking/Following">{t('report.catStalking')}</option>
                  <option value="Unsafe Area">{t('report.catUnsafeArea')}</option>
                  <option value="Other Safety Risk">{t('report.catOther')}</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {t('report.labelLocation')}
                </label>
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs p-3.5 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white" 
                  placeholder={t('report.placeLocation')}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                {t('report.labelTitle')}
              </label>
              <textarea 
                rows="4"
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs p-3.5 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white leading-relaxed resize-none" 
                placeholder={t('report.placeTitle')}
                required
              ></textarea>
            </div>

            {/* Evidence attachment */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                {t('report.labelUpload')}
              </label>
              <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#160913]/30 cursor-pointer relative hover:border-pink-500 transition-colors">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {evidencePreview ? (
                  <div className="w-full max-h-48 rounded-lg overflow-hidden relative">
                    <img src={evidencePreview} alt="Attached Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 py-4 text-slate-400">
                    <ImageIcon className="h-8 w-8 text-slate-400" />
                    <span className="text-[10px] font-semibold">Select image evidence to attach</span>
                  </div>
                )}
              </div>
            </div>

            {/* Anonymous mode toggle */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-[#160913]/30 rounded-xl border border-slate-200/50 dark:border-white/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-[#a89ec4]">
                <EyeOff className="h-4.5 w-4.5 text-pink-600 dark:text-pink-400" />
                <span>{t('report.labelAnon')}</span>
              </div>
              <input 
                type="checkbox" 
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-4.5 h-4.5 accent-pink-600 cursor-pointer"
              />
            </div>

            {/* Submit btn */}
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-lg shadow-pink-500/20"
            >
              <FileText className="h-4.5 w-4.5" />
              <span>{submitting ? 'Filing Report Log...' : t('report.btnSubmit')}</span>
            </button>

          </form>
        </div>
      )}

    </div>
  );
}
