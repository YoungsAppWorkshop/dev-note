# Git Configuration


### 1. Install Git (if necessary)
- Go to [Git Download Page](https://git-scm.com/downloads)
- Download the software for Mac/Linux
- Install Git choosing all of the default options


### 2. Configure Terminal
To configure the terminal:


- Download the `git-terminal-config` directory into home directory and name it `.git-terminal-config`
- Copy the content of `bash_profile` into `.bash_profile` or `.profile`


### 3. First Time Git Configuration
Run each of the following lines on the command line to make sure everything is set up.

```
# Set up Git with your name
git config --global user.name "<Your-Full-Name>"

# Set up Git with your email
git config --global user.email "<your-email-address>"

# Make sure that Git output is colored
git config --global color.ui auto

# Display the original state in a conflict
git config --global merge.conflictstyle diff3

# Ignore unix file permissions change
git config --global core.filemode false

# Set git to use the credential memory cache (or you can store)
git config --global credential.helper cache

git config --list
```


### 4. Attributions
Git configuration scripts are from [Udacity](https://www.udacity.com/)'s [Version Control with Git](https://www.udacity.com/course/version-control-with-git--ud123) course.
