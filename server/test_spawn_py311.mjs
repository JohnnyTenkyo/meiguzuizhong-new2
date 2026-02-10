import { spawn } from 'child_process';

const proc = spawn('/usr/bin/python3.11', ['-c', 'import sys; print(sys.version)']);

proc.stdout.on('data', (data) => console.log('STDOUT:', data.toString()));
proc.stderr.on('data', (data) => console.log('STDERR:', data.toString()));
proc.on('close', (code) => console.log('Exit code:', code));
