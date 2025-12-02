# New Paltz CS Lab Website --- Development Guide

This guide explains how to set up the **frontend**, **backend**, **local
database**, and the **Git workflow** for the New Paltz CS Lab Website
project.

## GitHub Repository

GitHub Repository (connected to the live site):\
**https://github.com/kaitlinchoffmann/NewPaltz-CS-Lab-Website**

Live website:\
**https://hydra.newpaltz.edu/**

### Clone the Repo

``` bash
git clone https://github.com/kaitlinchoffmann/NewPaltz-CS-Lab-Website
```

Once cloned, you'll see the project folders, except for hidden files
like `.env` and other dummy files which must be provided separately.

### Branching Workflow

1.  Always create a **new branch** before making changes.
2.  After modifying files, open the **Source Control** tab.
3.  Add a commit message → Commit.
4.  Open a **Pull Request** from your branch to `main`.
5.  If everything looks good, **Squash & Merge**.

------------------------------------------------------------------------

#  Local Development Setup

## 1. Frontend Setup

Open a terminal:

``` bash
cd client
```

### Check Node.js & npm

``` bash
node -v
npm -v
```

Install Node.js if missing:\
https://nodejs.org/en

### Install Dependencies

``` bash
npm install
```

### Run the Frontend

``` bash
npm run dev
```

A link will appear---Ctrl+Click to open it.

------------------------------------------------------------------------

# Backend Setup

Open a **second terminal**:

``` bash
cd server
npm install
```

Before running the backend, the local database must be configured.

------------------------------------------------------------------------

# Database Setup (MariaDB)

## Install MariaDB

Download from:\
https://mariadb.org/download/?t=mariadb&p=mariadb&r=12.1.2

-   Choose the **MSI installer**
-   Create a **root password**
-   Restart PowerShell afterward

------------------------------------------------------------------------

## Connect to MariaDB

``` bash
mysql -u root -p
```

Enter your root password.

------------------------------------------------------------------------

## Create a Non-Root User

``` sql
CREATE USER '<your_username_here>'@'localhost' IDENTIFIED BY '<your_password_here>';
```

Create a database:

``` sql
CREATE DATABASE localdb;
-- or:
CREATE DATABASE hydraLab;
```

Grant the user permissions:

``` sql
GRANT ALL PRIVILEGES ON localdb.* TO '<your_username_here>'@'localhost';
FLUSH PRIVILEGES;
```

Test login:

``` bash
mysql -u <your_username_here> -p localdb
```

------------------------------------------------------------------------

# Import the Database Contents

Move the provided `db.txt` file to your Desktop. This should be in the Server Folder

Then run:

``` bash
Get-Content "C:\Users\<your_username_here>\Desktop\db.txt" | mysql -u <your_username_here> -p localdb
```

Log back in:

``` bash
mysql -u <your_username_here> -p localdb
USE localdb;
SHOW TABLES;
```

------------------------------------------------------------------------

## Create a Local Admin User

``` sql
INSERT INTO Admins (user, email, password_hash, role)
VALUES ('localadmin', 'localadmin@example.com',
'$2y$10$J2J.G6EpExEZ2vwdXpAeLu94hK02e86leHEIkSutm6dT/wZMtoOBK',
'admin');
```

Credentials created:

-   **Username:** localadmin
-   **Password:** admin

Generate your own password hash:
https://bcrypt.online/

------------------------------------------------------------------------

# Setting Up the `.env` File

Create `.env` inside **server**:

    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=<your_username_here>
    DB_PASSWORD=<your_password_here>
    DB_NAME=localdb

Verify your DB port:

``` bash
mysql -u <your_username_here> -p localdb
SHOW VARIABLES LIKE 'port';
```

------------------------------------------------------------------------

# ▶Run the Backend

``` bash
npm run dev
```

If configured correctly, the backend will start without errors.

------------------------------------------------------------------------

#  Setup Complete

Your frontend, backend, and database are now connected. Use:

-   **Username:** localadmin
-   **Password:** admin
