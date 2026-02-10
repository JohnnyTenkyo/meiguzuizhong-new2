#!/bin/bash
# Truth Social Python 脚本包装器
# 确保使用 Python 3.11 并设置正确的环境

export PYTHONHOME=/usr
export PYTHONPATH=/usr/lib/python3.11:/usr/local/lib/python3.11/dist-packages
export LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH

exec /usr/bin/python3.11 "$@"
