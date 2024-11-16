#!/bin/bash

hour=$(date +%H)

if [ "$hour" -ge 6 ] && [ "$hour" -lt 10 ]; then
    hyprctl hyprpaper wallpaper ", ~/.config/backgrounds/outset_island_morning.jpg"
elif [ "$hour" -ge 10 ] && [ "$hour" -lt 17 ]; then
    hyprctl hyprpaper wallpaper ", ~/.config/backgrounds/outset_island_day.jpg"
elif [ "$hour" -ge 17 ] || [ "$hour" -lt 20 ]; then
    hyprctl hyprpaper wallpaper ", ~/.config/backgrounds/outset_island_evening.jpg"
elif [ "$hour" -ge 20 ] || [ "$hour" -lt 6 ]; then
    hyprctl hyprpaper wallpaper ", ~/.config/backgrounds/outset_island_night.jpg"
fi
