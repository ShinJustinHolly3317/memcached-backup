# How to use
This is an script for NodeJS developer to backup Memcached items cause no backup mechanism of any function in origin Memcached cli.

simple 2 steps can scan all keys which still within expiration date and write to local directory.

1. run memcached-backup.js
```
node ./memcached-backup.js
```
This script basically use cachedump to scan all the keys which are not expired, and get all of their value, and store in local.

2. run restore-backup-memcached.js
```
node ./restore-backup-memcached.js
```
Simply set back local backup files.