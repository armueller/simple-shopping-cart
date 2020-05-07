#!/bin/bash

echo Starting server...
cd /usr/src/server && nohup node server.js &

echo Starting client...
cd /usr/src/client && npm run start-no-reload