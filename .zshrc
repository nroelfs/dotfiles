#!/usr/bin/bash

fastfetch
#########################################
#                 EVAL                  #
#########################################
eval "$(starship init zsh)"
eval "$(zoxide init zsh)"
eval "$(fzf --zsh)"

#########################################
#                 ALIAS                 #
#########################################

alias clear='clear & fastfetch'
alias cls='clear & fastfetch'

alias ls='ls --color=auto'
alias grep='grep --color=auto'

alias cd='z'
alias i="zi"
alias ci="zi"
alias cdi="zi"

alias pipes="pipes.sh -t 0"

#########################################
#                 EXPORTS               #
#########################################

export PATH=$PATH:/Users/nicklas/.spicetify
