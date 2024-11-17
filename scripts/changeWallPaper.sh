#!/bin/bash

hour=$(date +%H)

if [ "$hour" -ge 6 ] && [ "$hour" -lt 10 ]; then
    hyprctl hyprpaper wallpaper ", ~/.config/backgrounds/outset_island_morning.jpg"
    echo "morning"
elif [ "$hour" -ge 10 ] && [ "$hour" -lt 17 ]; then
    hyprctl hyprpaper wallpaper ", ~/.config/backgrounds/outset_island_day.jpg"
    echo "day"
elif [ "$hour" -ge 17 ] && [ "$hour" -lt 20 ]; then
    hyprctl hyprpaper wallpaper ", ~/.config/backgrounds/outset_island_evening.jpg"
    echo "evening"
else
    hyprctl hyprpaper wallpaper ", ~/.config/backgrounds/outset_island_night.jpg"
    echo "night"
fi
