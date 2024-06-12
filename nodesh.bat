@echo off

npm ci

timeout /t 3 >nul

start /B npm start

timeout /t 3 >nul

cd ..
move nodesh %HOMEPATH%
