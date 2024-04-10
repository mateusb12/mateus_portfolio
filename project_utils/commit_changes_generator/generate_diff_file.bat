@echo off
REM Generate the .diff file with commit changes
git diff > commit_changes.diff

REM Append your specific pattern to the end of the .diff file, properly escaping & characters
echo. >> commit_changes.diff
echo Can you please summarize the commit above into key points? After that, I want you to merge these key points into a single commit message. >> commit_changes.diff

echo Diff file created and customized in the current directory.
