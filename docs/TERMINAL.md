# Terminal Commands

## Useful Commands

- Delete All Files Recursively with a extension
  - `find . -type f -name '*.o' -delete`

### Compressing and Archiving Files

- Creates an archive that contains multiple files and directories.
  - Syntax:   `tar [c|t|x] [flags] files_and_directories_to archive`
  - Packing archive: `tar -czvf output_filename.tgz source_folder_name`
  - Unpacking archive: `tar -xvzf file_name`
    - `tar xzvf redis-stable.tar.gz`
  - Options
    - `-c`: Creates archives
    - `-t`: Shows what’s in an existing archive
    - `-f`: Specify the archive name
    - `-z`: Compress its output with gzip
    - `-v`: Verbose output

- Compress files to a `.gz` file: `gzip [-v] FILENAME`
  - `-v`: Compressing rate

- Uncompress files from a `.gz` file: `gunzip FILENAME`

### File System Management

- View Storage Devices
  - `sudo fdisk -l`
  - `lsblk`

- Check Disk Usage
  - `df -h`
  - `df -i`: i-node

- Shows disk usage of the file or directory
  - `du -shc FILENAME | DIRECTORY_NAME`

- Calculates the system’s free disk space: `df -h`
  - `-h`: Divide-by-2 rule, more accurate
  - `-H`: Divide-by-10 rule, more friendly
  - `-m`: 1 MB block


- Creating a link(hard link) to a file : `ln FILENAME LINKNAME`
  - `-s`: Creating a symbolic link to a file

- Locate Files based on strings: `locate STRING`

- Browse File Content
  - `grep option(s) regular_expression`
  - `cat -n file_name`
    - `-n`: Add line numbers
  - `less -M file_name`
    - `-M`: Show the filename and position in the file
    - `SpaceBar`: Display next page
    - `Return`: Display next line
    - `v`: Start the vi editor
    - `h`: Display help
    - `/word`: Search forward for word
    - `?word`: Search forward for word

### File and Directory Wildcards

- `*`: Any number of characters in a filename
- `?`: Any single character
- `[ ]`: Similar to ‘OR’
- `{ , }`: List of two or more subpatterns

```bash
# Match either Chapter or chapter
ls [Cc]hapter
# chap1, chap2, or chap3
ls chap[1-3]
# Match abe, ace, ade
ls a{b,c,d}e
```

### Group Management

- groups  : `groups username`

- Managing Groups
  - `groupadd groupname`
  - `groupdel groupname`

- Managing Users of the group
  - Add a member to a group
    - `usermod -aG groupname username`
    - `gpasswd -a username groupname`

  - Change the primary group for a user
    - `usermod -G groupname username`

  - Change a username and the home directory
    - `usermod -d /home/directory username -m`
    - `usermod -l newname oldname`

  - Remove a user from a group
    - `gpasswd -d username grouptoremove`


- `cat /etc/group`
  - group_name:group_password:GID:users
  - users: comma separated. Each user is a member of the group.

### History Tricks

- Sudo Previous Command: `sudo !!`

- Reverse-i-search: `CTRL + R`

- Execute the last command that matches the specified characters
  - `!characters`

- Review most oft-used UNIX commands
  - `history|awk '{print $2}'|awk 'BEGIN {FS="|"} {print $1}'|sort|uniq -c|sort -r`

- Caret substitution trick: substitute the previous command

```bash
$ cd mydriectory
bash: cd: mydriectory: No such file or directory
$ ^ri^ir
```

- Yield the second most recent command: `!-2`

- Select arguments with the colon

```bash
$ mv oldfilename newfilename
$ ls
$ more !-2:2
more newfilename
```

### Network

- Copy

```bash
scp -i PUBLIC_KEY -P PORT_NUMBER -rp SOURCE TARGET
```

- Find Public IP Address

```bash
ip addr
ip addr show DEVICE_NAME | grep inet | awk '{ print $2; }' | sed 's/\/.*$//'
```

### Package Management

- Package List: `cat /etc/apt/sources.list`

- Updating Available Package List: `sudo apt-get update`

- Upgrading Installed Packages
  - `sudo apt-get upgrade`
  - `sudo apt-get dist-upgrade`

- Removing Unnecessary Packages: `sudo apt-get autoremove`

- Package search: [Ubuntu Packages Search](https://packages.ubuntu.com/)

### Process Management

- Shows how the system is performing: `top`

- Shows a complete and full list of every application, utility and system process running
  - `ps -acx`

- Finds out the process number for the Word
  - `ps -ax | grep WORD`

- Kills the process of the PID 1634
  - `kill 1634`

- Check Which ports are being listened
  - `sudo netstat -tupan`

### User Management

- Create a user: `sudo adduser username`

- Connecting Remote Server via `ssh`
  - `ssh username@127.0.0.1 -p 2222`
  - `ssh username@127.0.0.1 -p 2222 -i ~/.ssh/KEY_NAME`

- Add sudoers
  - `sudo cat /etc/sudoers`
  - Include User file in `/etc/sudoers.d`

```bash
username ALL=(ALL) NOPASSWD:ALL
```

- Resetting Passwords as System Administrator

```bash
sudo passwd -e username
```

- Switching between users
  - Switching to root
    - `sudo su`

  - Switching to other users
    - `sudo su - username`

- Check Users' Information: `finger`
  - Install: `sudo apt-get install finger`
  - Usage: `finger USERNAME`

- Changes password: `passwd`

- Special Files
  - `cat /etc/passwd`
    - username:password:UID:GID:UID info:home directory:command/shell
    - user ID (UID): the user’s ID number in the system. 0 is root, 1-99 are for predefined users, and 100-999 are for other system accounts
    - group ID(GID): Primary group ID, stored in /etc/group.
    - user ID info: Metadata about the user; phone, email, name, etc.
    - home directory: Where the user is sent upon login. Generally /home/
    - command/shell: The absolute path of a command or shell (usually /bin/bash). Does not have to be a shell though!

  - `cat /etc/shadow`
    - username:password:Epoch:MinDays:MaxDays:ElapseDays:beforeExpire:EpochExpires
    - password_hash: actual hash for the user’s password
    - Epoch: number of Unix Epoch password change
    - MinDays: days required to change password
    - MaxDays: maximum days between password change
    - ElapseDays: days users warned to change password
    - beforeExpire: how many days the password expire before disabled
    - EpochExpires
