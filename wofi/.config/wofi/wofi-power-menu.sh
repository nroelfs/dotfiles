#!/bin/bash

entries="⏻ Shutdown\n
    ⟳ Reboot\n
    🔒 Lock\n
    ⏾ Suspend"

selected=$(echo -e $entries|wofi --conf ~/dotfiles/wofi/.config/wofi/powermenu --cache-file /dev/null | awk '{print tolower($2)}')

case $selected in
    lock)
        exec hyprlock;;
    suspend)
        exec systemctl suspend;;
    reboot)
        exec systemctl reboot;;
    shutdown)
        exec shutdown now;;
esac
