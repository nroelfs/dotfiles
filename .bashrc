#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'

alias clear='clear & fastfetch'
alias c="clear"
alias cls="clear"

alias pipes="pipes.sh -t 0"

alias cd='z'
alias i="zi"
alias ci="zi"
alias cdi="zi"

PS1='[\u@\h \W]\$ '
fastfetch


eval "$(starship init bash)"
eval "$(zoxide init bash)"
eval "$(fzf --bash)"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH=$BUN_INSTALL/bin:$PATH

PATH=~/.console-ninja/.bin:$PATH


export PATH="$PATH:$HOME/.dotnet/tools/"
export PATH="$PATH:$HOME/.duckdb/cli/latest"
