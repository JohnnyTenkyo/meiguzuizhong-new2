import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.join(__dirname, 'truth_social_cffi.py');

console.log('Script path:', scriptPath);
console.log('Calling Python 3.11...');

const proc = spawn('/usr/bin/python3.11', [
  scriptPath,
  'realDonaldTrump',
  'y_kblnrxHFj2YdggACzWPIJhpYit0eiRabIJj0q6GeE',
  '3'
]);

let stdout = '';
let stderr = '';

proc.stdout.on('data', (data) => { stdout += data.toString(); });
proc.stderr.on('data', (data) => { stderr += data.toString(); });

proc.on('close', (code) => {
  console.log('Exit code:', code);
  if (stdout) console.log('STDOUT:', stdout.substring(0, 500));
  if (stderr) console.log('STDERR:', stderr.substring(0, 500));
});

setTimeout(() => proc.kill(), 10000);
