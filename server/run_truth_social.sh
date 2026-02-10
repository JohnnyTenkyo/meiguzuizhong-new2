#!/bin/bash
# Shell wrapper to ensure Python 3.11 is used for Truth Social script

# Clear any Python 3.13 related environment variables
unset PYTHONHOME

# Force Python 3.11 standard library path only
export PYTHONPATH="/usr/lib/python3.11:/usr/lib/python3.11/lib-dynload:/usr/local/lib/python3.11/dist-packages:/usr/lib/python3/dist-packages"

# Remove any Python 3.13 paths from PATH
export PATH=$(echo "$PATH" | tr ':' '\n' | grep -v 'cpython-3.13' | tr '\n' ':')

exec /usr/bin/python3.11 "$(dirname "$0")/truth_social_cffi.py" "$@"
