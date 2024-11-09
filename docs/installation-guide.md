# Installation Guide

## Prerequisites

Make sure you have the following installed on your system:

-   [PHP](https://www.php.net/) (>= 8.0 recommended)
-   [Composer](https://getcomposer.org/)
-   [Node.js](https://nodejs.org/)
-   [MariaDB](https://mariadb.org/)

## Steps to Install

1. **Navigate to the Project Directory** <br />
   Open a terminal and navigate to the root directory of your Laravel project.

2. **Install PHP Dependencies** <br />
   Run the following command to install Laravel and other PHP dependencies:

    ```bash
    composer install
    ```

3. **Create the `.env` File** <br />
   Copy the `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your database credentials and other necessary configuration.

4. **Generate Application Key** <br />
   Generate a new application key using the Artisan command:

    ```bash
    php artisan key:generate
    ```

5. **Run Database Migrations** <br />
   Migrate the database tables by running:

    ```bash
    php artisan migrate
    ```

6. **Install JavaScript Dependencies** <br />
   Run the following command to install your frontend dependencies:

    ```bash
    npm install
    ```

7. **Compile Frontend Assets** <br />
   To compile your React components and other assets, use:

    ```bash
    npm run dev
    ```

    For a production build, you can use:

    ```bash
    npm run build
    ```

8. **Start the Development Server** <br />
   To run the Laravel development server, execute:
    ```bash
    php artisan serve
    ```
    You can access the application at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

Your project should now be up and running! If you encounter any issues during setup, check the error messages or consult the [Laravel documentation](https://laravel.com/docs).
