import { spawn } from 'child_process';

const python = spawn('/usr/bin/python3.11', ['-c', 'import sys; print("\\n".join(sys.path)); import truthbrush; print("SUCCESS")']);

python.stdout.on('data', (data) => {
  console.log('STDOUT:', data.toString());
});

python.stderr.on('data', (data) => {
  console.error('STDERR:', data.toString());
});

python.on('close', (code) => {
  console.log('Exit code:', code);
});
