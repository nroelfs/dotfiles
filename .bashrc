#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'
alias clear='clear & fastfetch'
PS1='[\u@\h \W]\$ '
fastfetch
eval "$(starship init bash)"
