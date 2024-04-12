@echo off
REM Generate the .diff file with commit changes
git diff > commit_changes.diff

REM Append your specific pattern to the end of the .diff file, properly escaping & characters
echo. >> commit_changes.diff
echo Can you please summarize the diff above into this format? commit title, commit key points. You should use a maximum of 5 key points, each of them should be preceded by a - character. Please write a snippet which I can easily copy paste. >> commit_changes.diff

echo Diff file created and customized in the current directory.
