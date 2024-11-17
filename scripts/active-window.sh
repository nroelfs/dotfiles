#!/bin/bash

ACTIVE=$(hyprctl activewindow -j)
TITLE=$(echo $ACTIVE | jq -r '.title')
APP_ICON=$(echo $ACTIVE | jq -r '.icon')
if [[ "$TITLE" == "null" ]] || [[ "$TITLE" == "" ]]; then
	TEXT=" $(whoami)@$(hostname)"
	TOOLTIP="$(uname -s) $(uname -r)"
else
	TEXT="${APP_ICON} ${TITLE}"
	TOOLTIP="class: $(echo $ACTIVE | jq -r '.class')\nxwayland: $(echo $ACTIVE | jq -r '.xwayland')"
fi

JSON=$(echo "{\"text\":\"${TEXT}\", \"tooltip\":\"${TOOLTIP}\"}" | sed 's/&/\&amp;/g')

echo "${JSON}"
