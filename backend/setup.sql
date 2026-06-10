-- ==========================================
-- Supabase Database Setup Script for Women Safety App
-- Copy and paste this script into the Supabase SQL Editor to initialize your database!
-- ==========================================

-- 1. Create trusted_contacts Table
CREATE TABLE IF NOT EXISTS public.trusted_contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    relationship TEXT NOT NULL,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on trusted_contacts
ALTER TABLE public.trusted_contacts ENABLE ROW LEVEL SECURITY;

-- Drop policy if it exists and recreate it
DROP POLICY IF EXISTS "Users can manage their own trusted contacts" ON public.trusted_contacts;
CREATE POLICY "Users can manage their own trusted contacts" 
ON public.trusted_contacts 
FOR ALL 
USING (true)
WITH CHECK (true);


-- 2. Create sos_alerts Table
CREATE TABLE IF NOT EXISTS public.sos_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    user_email TEXT,
    user_name TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on sos_alerts
ALTER TABLE public.sos_alerts ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist and recreate them
DROP POLICY IF EXISTS "Anyone can file an SOS alert" ON public.sos_alerts;
CREATE POLICY "Anyone can file an SOS alert" 
ON public.sos_alerts 
FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can read SOS alerts" ON public.sos_alerts;
CREATE POLICY "Anyone can read SOS alerts" 
ON public.sos_alerts 
FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Anyone can update SOS alerts" ON public.sos_alerts;
CREATE POLICY "Anyone can update SOS alerts" 
ON public.sos_alerts 
FOR UPDATE 
USING (true);

DROP POLICY IF EXISTS "Anyone can delete SOS alerts" ON public.sos_alerts;
CREATE POLICY "Anyone can delete SOS alerts" 
ON public.sos_alerts 
FOR DELETE 
USING (true);


-- 3. Create incident_reports Table
CREATE TABLE IF NOT EXISTS public.incident_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    user_email TEXT,
    user_name TEXT,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    anonymous BOOLEAN DEFAULT false,
    evidence_url TEXT,
    status TEXT DEFAULT 'Pending' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on incident_reports
ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist and recreate them
DROP POLICY IF EXISTS "Anyone can file an incident report" ON public.incident_reports;
CREATE POLICY "Anyone can file an incident report" 
ON public.incident_reports 
FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can read incident reports" ON public.incident_reports;
CREATE POLICY "Anyone can read incident reports" 
ON public.incident_reports 
FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Anyone can update/delete incident reports" ON public.incident_reports;
CREATE POLICY "Anyone can update/delete incident reports" 
ON public.incident_reports 
FOR ALL 
USING (true);
