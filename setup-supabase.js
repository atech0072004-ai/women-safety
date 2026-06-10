const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function main() {
  console.log('\n======================================================');
  console.log('       Supabase Linker for Women Safety App           ');
  console.log('======================================================\n');
  console.log('This utility will configure your Supabase credentials in:');
  console.log(' - frontend/.env (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)');
  console.log(' - backend/.env  (SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)\n');
  
  const supabaseUrl = (await askQuestion('1. Enter Supabase Project URL: ')).trim();
  const anonKey = (await askQuestion('2. Enter Supabase Anon Key (public): ')).trim();
  const serviceRoleKey = (await askQuestion('3. Enter Supabase Service Role Key (secret): ')).trim();
  
  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    console.error('\n❌ Error: All credentials are required to link the project.');
    rl.close();
    process.exit(1);
  }
  
  // Paths
  const backendEnvPath = path.join(__dirname, 'backend', '.env');
  const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
  
  // Update Backend Env
  try {
    let backendEnv = '';
    if (fs.existsSync(backendEnvPath)) {
      backendEnv = fs.readFileSync(backendEnvPath, 'utf8');
    }
    // Replace values
    backendEnv = backendEnv.replace(/SUPABASE_URL=.*/, `SUPABASE_URL=${supabaseUrl}`);
    backendEnv = backendEnv.replace(/SUPABASE_ANON_KEY=.*/, `SUPABASE_ANON_KEY=${anonKey}`);
    backendEnv = backendEnv.replace(/SUPABASE_SERVICE_ROLE_KEY=.*/, `SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}`);
    
    // Fallback if keys don't exist in file
    if (!backendEnv.includes('SUPABASE_URL=')) backendEnv += `\nSUPABASE_URL=${supabaseUrl}`;
    if (!backendEnv.includes('SUPABASE_ANON_KEY=')) backendEnv += `\nSUPABASE_ANON_KEY=${anonKey}`;
    if (!backendEnv.includes('SUPABASE_SERVICE_ROLE_KEY=')) backendEnv += `\nSUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}`;
    
    fs.writeFileSync(backendEnvPath, backendEnv, 'utf8');
    console.log('✅ Updated backend/.env successfully.');
  } catch (err) {
    console.error('❌ Failed to update backend/.env:', err.message);
  }
  
  // Update Frontend Env
  try {
    let frontendEnv = '';
    if (fs.existsSync(frontendEnvPath)) {
      frontendEnv = fs.readFileSync(frontendEnvPath, 'utf8');
    }
    // Replace values
    frontendEnv = frontendEnv.replace(/VITE_SUPABASE_URL=.*/, `VITE_SUPABASE_URL=${supabaseUrl}`);
    frontendEnv = frontendEnv.replace(/VITE_SUPABASE_ANON_KEY=.*/, `VITE_SUPABASE_ANON_KEY=${anonKey}`);
    
    // Fallback if keys don't exist in file
    if (!frontendEnv.includes('VITE_SUPABASE_URL=')) frontendEnv += `\nVITE_SUPABASE_URL=${supabaseUrl}`;
    if (!frontendEnv.includes('VITE_SUPABASE_ANON_KEY=')) frontendEnv += `\nVITE_SUPABASE_ANON_KEY=${anonKey}`;
    
    fs.writeFileSync(frontendEnvPath, frontendEnv, 'utf8');
    console.log('✅ Updated frontend/.env successfully.');
  } catch (err) {
    console.error('❌ Failed to update frontend/.env:', err.message);
  }
  
  console.log('\n======================================================');
  console.log('👉 Next Steps on your Supabase Dashboard:');
  console.log('1. Go to your Supabase Project SQL Editor.');
  console.log('2. Click "New Query" and paste the contents of backend/setup.sql.');
  console.log('3. Click "Run" to initialize tables & Row-Level Security.');
  console.log('4. Go to Storage page, create a bucket named "incident_evidence"');
  console.log('   and switch its visibility toggle to "Public".');
  console.log('======================================================\n');
  
  rl.close();
}

main();
