@echo off
cd /d "%~dp0"

echo Adding all files...
git add -A

echo Committing...
git commit -m "Update: change school guide book"

echo Pushing to GitHub...
git push origin main

echo Done!
pause