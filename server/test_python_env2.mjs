import { spawn } from 'child_process';

// Test with full env (like the dev server does)
const proc = spawn('bash', ['-c', '/usr/bin/python3.11 -c "import sys; print(sys.version); import json; print(json.__file__)"'], {
  env: { ...process.env }
});

let out = '';
proc.stdout.on('data', d => out += d);
proc.stderr.on('data', d => out += d);
proc.on('close', (code) => {
  console.log('=== Full env ===');
  console.log('Exit code:', code);
  console.log(out);
  
  // Now find python-related env vars
  const pyVars = Object.entries(process.env).filter(([k, v]) => 
    v && (v.includes('python') || v.includes('Python') || v.includes('3.13'))
  );
  console.log('=== Env vars containing python/3.13 ===');
  pyVars.forEach(([k, v]) => console.log(`${k}=${v}`));
});
