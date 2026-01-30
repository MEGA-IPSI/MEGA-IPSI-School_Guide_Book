@echo off
cd /d "%~dp0"
echo Adding files...
git add -A
echo Committing...
git commit -m "Update: mobile 100dvh, credit card design, curriculum table styles"
echo Pushing to GitHub...
git push origin main
echo Done!
pause
