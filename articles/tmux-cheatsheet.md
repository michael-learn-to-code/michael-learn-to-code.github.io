---
title: Tmux cheatsheet
date: 2019-12-08
tags: tmux
keywords: tmux, cheatsheet, unix
description: Tmux cheatsheet. Some tips about using tmux for work
toc: true
imageId: Tjbk79TARiE
imageAuthor: Sai Kiran Anagani
---

# How to use tmux for work

## Some basic concepts

`session` = set of `window`s (`window` can consider as `tab`)

`window` can have some `tab`s

`tab` can be split to some `pane`s

## Working with `window`

Create new window

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>c</kbd>

Rename window

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>,</kbd>

Close current window

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>&</kbd>

Move to next window

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>n</kbd>

Move to previous window

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>p</kbd>

Move to window by index

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>0</kbd>...<kbd>9</kbd>

## Working with panes

Diffrent from `window`, we cannot create new `pane`. we just split the `window` into 1 or many `pane`.

Split pane vertically, the cursor will focus in the right pane.

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>%</kbd>

Split pane horizontally, the cursor will focus in the bottom pane.

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>"</kbd>

Toggle the last active pane

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>;</kbd>

Move the pane to the left

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>}</kbd>

Move the pane to the right

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>{</kbd>

Switch to panel by direction

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>ARROW UP</kbd>

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>ARROW DOWN</kbd>

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>ARROW LEFT</kbd>

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>ARROW RIGHT</kbd>

Show pane number

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>q</kbd>

Switch to pane by number

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>q</kbd>&emsp;<kbd>1</kbd>...<kbd>9</kbd>

Convert panel to window

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>!</kbd>

Resize panel

<kbd>CTRL</kbd>+<kbd>b</kbd>, then hold <kbd>CTRL</kbd>+<kbd>ARROW LEFT</kbd>

<kbd>CTRL</kbd>+<kbd>b</kbd>, then hold <kbd>CTRL</kbd>+<kbd>ARROW RIGHT</kbd>

<kbd>CTRL</kbd>+<kbd>b</kbd>, then hold <kbd>CTRL</kbd>+<kbd>ARROW UP</kbd>

<kbd>CTRL</kbd>+<kbd>b</kbd>, then hold <kbd>CTRL</kbd>+<kbd>ARROW DOWN</kbd>

_Note_

1. On Mac, this shortcuts may not work as expected.

   One possible reason is the combination <kbd>CTRL</kbd>+<kbd>ARROW LEFT</kbd> already used by `Mission Control`.
   You could change it by `System Preferences` => `Keyboard` => `Shortcuts`, find `Mission Control`, and untick all combinations of Arrow keys

1. If there are many clients connect to 1 window at the same time, the size of window will be constrainted by the maximum size of connected clients. to fix that, we need to change tmux's configuration

```
# Rather than constraining window size to the maximum size of any client
# connected to the *session*, constrain window size to the maximum size of any
# client connected to *that window*. Much more reasonable.
setw -g aggressive-resize on
```

or run it in command mode

Move to next pane

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>o</kbd>

Close current pane

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>x</kbd>

## Copy Mode

In copy mode, we can moving around the screen (scroll up or down,...)

Enter the copy mode

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>[</kbd>

Enable vim keys in copy mode

`setw -g mode-keys vi`

Quit copy mode

<kbd>q</kbd>

Search forward

<kbd>/</kbd>

Search backword

<kbd>?</kbd>

Start selection

<kbd>Space</kbd>

Clear selection

<kbd>Esc</kbd>

Copy selection

<kbd>Enter</kbd>

Paste content

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>]</kbd>

## Command mode

Enter command mode

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>:</kbd>

Set option for all session

`set -g OPTION`

Set option for all windows

`setw -g OPTION`

## Misc

Show help

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>?</kbd>

Save buffer to file

```
:save-buffer buff.txt
```

#### How to detach nested tmux

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>d</kbd>

The situation here is, you use tmux on local, then ssh to a server, then open tmux on server. Now you want to detach the tmux session on server.

The first combination will tell local tmux to listen your commands.
All next keys will be sent to remote tmux by your local tmux

#### How to attach loss tmux session

Sometime we suddenly close the iterm window without exiting tmux correctly.
After that, all processes keep running. Now we need to attach back to previous session, then stop the process.

first, list all sessions by `tmux ls` command. then try to attach session by `tmux a -t <session id>`
if you got error:
`sessions should be nested with care, unset $TMUX to force`
then, you need to follow the instruction: `unset TMUX`
Now, you can freely attach to any session.

#### Toggle between horizontal layout and vertical layout

<kbd>CTRL</kbd>+<kbd>b</kbd>&emsp;<kbd>SPACE</kbd>

## References

- http://hyperpolyglot.org/multiplexers
