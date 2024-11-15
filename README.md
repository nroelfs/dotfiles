# Install Guide 

## Install Yay 
AUR Package Manager
```
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

## Install Packages
Install required Packages
```
sudo pacman -S nano kitty networkmanger bluez bluetuith spaceship nwg-look hyprland hyprpaper hypridle hyprlock wofi waybar jdk21-openjdk nodejs npm stow git neofetch

yay -S ttf-cascadia-modo-nerd ttf-font-awesome deno dotnet-sdk dotnet-runtime 
```

## Set Idle Config
Set the hypridle config to lock in idle
```
touch ~/.config/hypr/hypridle.conf
nano ~/.config/hypr/hypridle.conf
```
Insert following code
```
general {
  lock_cmd = pidof hyprlock || hyprlock
  before_sleep_cmd = loginctl lock-session
  after_sleep_cmd = hyprctl dispatch dpms on
}

listener {
  timeout = 300                                  
  on-timeout = brightnessctl -s set 10         
  on-resume = brightnessctl -r                 
}

listener {
  timeout = 330
  on-timeout = loginctl lock-session
}

listener {
  timeout = 350
  on-timeout = hyprctl dispatch dpms off
  on-resume = hyprctl dispatch dpms on
}

# listener {
#   timeout = 1800
#   on-timeout = systemctl suspend
# }
```

## Set stow configs
Set the syslink for configs

```
stow wofi
stow starship
stow wayabr
stow hyprland
stow hyperlock
stow backgrounds
stow hyprpaper
stow kitty

rm ~/.bashrc
cp ~/dotfiles/.bashrc ~/


```
