# Hydra Server Access & Deployment Guide

This document explains how to access the **Hydra server**, navigate its
filesystem, view logs, manage the hydraLab database, and deploy updates
to the main website.

------------------------------------------------------------------------

# Accessing Hydra

When we talk about *Hydra*, we mean the **main login server** for the
Computer Science Lab. All other services (Chimera, MariaDB, Hydra
Engine) are accessed *through* Hydra.

------------------------------------------------------------------------

# SSH Access

To log into Hydra from a local machine:

``` bash
ssh <your_username_here>@hydra.newpaltz.edu
```

You should have received a CS Lab email containing:

-   **Username:** the beginning of your NP email (example: `mathewj11`)
-   **Temporary Password:** `S` + your N-number (example: `S12345678`)

After logging in, you'll see your Hydra terminal session.

------------------------------------------------------------------------

# Getting Familiar with the Server

As a project developer, you will have **sudo access**, meaning you can
modify system files and access restricted directories.

If you need Linux command references:\
https://linuxcommand.org/lc3_man_page_index.php

### Basic Commands

``` bash
cd /
```

Moves you to the **root directory**.

``` bash
ls
```

Lists files in the current directory.

Most web content, databases, and logs live under `/var`.

------------------------------------------------------------------------

# Important Directories

## `/var/log`

Navigate there:

``` bash
cd /var/log
ls
```

Here you will find:

-   `auth.log` → login + authentication activity\
    View with:

    ``` bash
    less auth.log
    ```

-   `apache2/` → Apache web server logs\
    View access/error logs:

    ``` bash
    cd apache2
    less access.log
    less error.log
    ```

This directory is essential when troubleshooting issues such as
**fail2ban**, backend crashes, or Apache errors.

------------------------------------------------------------------------

## `/var/www`

Navigate:

``` bash
cd /var/www
ls
```

You will find the deployed websites including:

-   **NewPaltz-CS-Lab-Website** → main site\
-   **gpt** → https://gpt.hydra.newpaltz.edu/auth\
-   **lccjs** → https://hydra.newpaltz.edu/lccjs/

Hydra is the **web server**, while Chimera is the deep learning/GPU
server.

### Project Directory Structure

``` text
/var/www/NewPaltz-CS-Lab-Website/
```

Inside:

### Frontend

    client/ → React frontend  
    public/ → static files  

### Backend

    server/src/ → API routes + controllers  
    server/.env → environment variables (not stored on GitHub)  

You will also see the deployment script:

    deploy.sh

Read it using:

``` bash
cat deploy.sh
```

or

``` bash
less deploy.sh
```

------------------------------------------------------------------------

# Accessing the hydraLab Database

To access MariaDB on Hydra:

``` bash
mysql hydraLab
```

(You should **not** be prompted for a password---contact Kaitlin if you
are.)

View tables:

``` sql
SHOW TABLES;
```

Exit MariaDB:

``` sql
exit
```

------------------------------------------------------------------------

# Pulling Changes on Hydra & Deploying to Main Site

Log into Hydra:

``` bash
ssh <your_username_here>@hydra.newpaltz.edu
```

------------------------------------------------------------------------

## 1. Configure Git Identity (One-Time Setup)

``` bash
git config --global user.name "Your GitHub Name"
git config --global user.email "Your GitHub Email"
```

------------------------------------------------------------------------

## 2. Test GitHub Connection (One-Time)

``` bash
ssh -T git@github.com
```

You should see something like:

    Hi <your_username_here>! You've successfully authenticated, but GitHub does not provide shell access.

------------------------------------------------------------------------

## 3. Navigate to the Website Directory

``` bash
cd /var/www/NewPaltz-CS-Lab-Website/
```

------------------------------------------------------------------------

## 4. Run the Deployment Script

``` bash
sudo ./deploy.sh
```

This script will:

-   Pull the latest changes from the **main branch**
-   Install/update dependencies
-   Restart the backend services
-   Deploy updates to Apache

If nothing changed, you may see warnings/errors showing why nothing
pulled.

------------------------------------------------------------------------

