import { spawn } from 'child_process';

const truthbrush = spawn('truthbrush', ['--version']);

truthbrush.stdout.on('data', (data) => {
  console.log('STDOUT:', data.toString());
});

truthbrush.stderr.on('data', (data) => {
  console.error('STDERR:', data.toString());
});

truthbrush.on('close', (code) => {
  console.log('Exit code:', code);
});

truthbrush.on('error', (error) => {
  console.error('Spawn error:', error);
});
