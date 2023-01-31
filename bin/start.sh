#!/bin/sh
(cd /app && npm udpate genshin-db && npm upgrade genshin-db)
(cd /app && npm run start)
