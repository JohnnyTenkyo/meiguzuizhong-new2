import { spawn } from 'child_process';

const proc = spawn('bash', ['-c', '/usr/bin/python3.11 -c "import sys; print(sys.version); print(sys.path); import json; print(json.__file__)"'], {
  env: Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith('npm_')))
});

let out = '';
proc.stdout.on('data', d => out += d);
proc.stderr.on('data', d => out += d);
proc.on('close', (code) => {
  console.log('Exit code:', code);
  console.log(out);
});
