import { spawn } from 'child_process';

const python = spawn('/usr/bin/python3.11', ['truth_social_helper.py', 'realDonaldTrump', '3']);

let stdout = '';
let stderr = '';

python.stdout.on('data', (data) => {
  stdout += data.toString();
});

python.stderr.on('data', (data) => {
  stderr += data.toString();
});

python.on('close', (code) => {
  console.log('Exit code:', code);
  console.log('STDOUT:', stdout);
  console.log('STDERR:', stderr);
});
