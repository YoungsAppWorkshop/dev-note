# Learning Unix for OS X

## Cheat Sheet

- `alias`: List all active aliases by typing without any arguments
- `date`: Get today’s date and time
- `finger` or `w`: Obtain more information about users
- `ls -al`: List all files in long format
- `ps -acx`: Shows a complete and full list of every application, utility, and system process running on your Mac
- `who`: List logged-in users
- `who am i`: Find out who is at your terminal
- `who am i;date`: Enter two commands in the same line

### `ps`

Shows a complete and full list of every application, utility, and system process running on your Mac.

```bash
$ ps -acx
  PID TTY           TIME CMD
   16 ??         0:00.24 diskarbitrationd
```

- PID: Lists the command’s process identification number (or PID, for short).
- TTY: Tells you the terminal the process is running in. If you see two question marks (??), that means the process isn’t associated with a specific Terminal window or display: typically it’s a system-level command or utility
- TIME: Tells you the amount of time it took to run that particular process, or how long that process has been running, in minutes and seconds.
- CMD: Gives you the specific command that’s being run.

```bash
$ ps -ax | grep Word
  1634 ??         0:02.50 /Applications/Microsoft Office 2011/MicrosoftWord.app/Contents/MacOS/Microsoft Word -psn_0_766139
  1645 ttys002    0:00.00 grep Word
$ kill 1634
```

### `ls`

The ls program displays a list of files.

- `-l`: (long) changes the output to a long format
- `-a`: (all) option for listing hidden files

```bash
$ ls -al
```
