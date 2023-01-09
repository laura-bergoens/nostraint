#!/bin/bash
# Reminder : to remove from str1 to str2 regex, multiline : sed "/STR1/,/STR2/d" ./path/to/file.any

# Delete tracelog utility file
rm build/src/tracelog.js

# Delete all calls and import lines in all files
find build/ \( -type d -name .git -prune \) -o -type f -print0 | xargs --null sed -i '/tracelog/d'
