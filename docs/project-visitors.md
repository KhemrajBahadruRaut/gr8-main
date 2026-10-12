# PHP project visitors

The frontend asks for a full name and email after selecting a project category.
The PHP backend sends a six-digit code, verifies it, and saves the visitor in
MySQL. Direct category links also require verification. Access lasts seven days
in the browser; codes expire after ten minutes and allow five incorrect attempts.

The admin **Project Visitors** section shows verified names and emails, project
categories viewed, visit counts, and dates, with search, filters, and CSV export.
It uses the existing PHP `admin_logged_in` session. Anonymous website traffic is
not listed as a named visitor.

## Backend files

The PHP files are in `C:\xampp\htdocs\gr8\api\project-visitors`. They reuse the existing
`C:\xampp\htdocs\gr8\db.php` connection, so no new database credentials are needed.
The five MySQL tables are created automatically when needed; `schema.sql` is also
provided for manual import if the database account cannot create tables.

The updated `C:\xampp\htdocs\gr8\api\works\get_works.php` keeps
the category cards public and returns project details only for verified visitors
and logged-in admins. Existing Works and Clients bootstrap files stay in place.

The frontend uses `NEXT_PUBLIC_GR8_API_URL` through the existing API helper.
There are no Node backend routes, SQLite files, or Node email dependencies for
this feature. The Next.js application remains the frontend.

## Email setup

Edit `C:\xampp\htdocs\gr8\.env`, which contains demo values for the PHP backend.
Replace the SMTP placeholders with the values from your email provider:

```dotenv
PROJECT_EMAIL_PROVIDER=smtp
PROJECT_VERIFICATION_FROM_EMAIL=projects@example.com
PROJECT_VERIFICATION_FROM_NAME="GR8 Nepal"
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASSWORD="your-smtp-password"
SMTP_ENCRYPTION=tls
RESEND_API_KEY=
PROJECT_ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,https://gr8.com.np,https://www.gr8.com.np"
PROJECT_COOKIE_SECURE=false
```

Use port 465 and `SMTP_ENCRYPTION=ssl` for implicit TLS. Install PHP dependencies
inside `api/project-visitors`:

```sh
composer install --no-dev
```

For Gmail, use `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, and
`SMTP_ENCRYPTION=tls`. Set `SMTP_USER` to the full Gmail address used by
`PROJECT_VERIFICATION_FROM_EMAIL`; the host is the mail server name.
Set `SMTP_PASSWORD` to a Google App Password for that account. Google requires
2-Step Verification to create one; see [Google's App Password instructions](https://support.google.com/accounts/answer/185833?hl=en)
and [Gmail SMTP settings](https://support.google.com/mail/answer/7104828?hl=en).

PHPMailer is used for SMTP; see its [official setup documentation](https://github.com/PHPMailer/PHPMailer).
Alternatively set `PROJECT_EMAIL_PROVIDER=resend`,
`PROJECT_VERIFICATION_FROM_EMAIL` to an approved sender, and `RESEND_API_KEY` to
your key. The Resend option uses PHP cURL.

`config.php` and `config.example.php` load this file automatically through
`_env.php` using [PHP dotenv](https://github.com/vlucas/phpdotenv). Values configured
in the PHP server's environment take precedence. Credentials placed in the
frontend `.env.local` do not configure Apache/PHP. `.env.example` contains the same
demo settings for sharing; the actual `.env` is excluded from Git and denied by
Apache's `.htaccess`. Never put real credentials in `.env.example`.

The demo SMTP settings cannot send verification emails. Replace them with real
settings before testing email delivery. No database credentials are needed here;
the endpoints continue to use the existing `db.php` connection.

## Cookies and origins

Admin authentication keeps using the existing PHP session. Visitor challenges use
a separate `GR8PROJECT` session, and verified access uses an HttpOnly opaque cookie
whose hash is saved in MySQL. Both frontend and PHP API should use the same site
(for example `gr8.com.np` and `api.gr8.com.np`, or localhost on different ports).
For HTTPS behind a reverse proxy, set `PROJECT_COOKIE_SECURE=true`.

The API permits the two GR8 production origins by default and localhost/same-host
development. Add other approved frontend origins to `PROJECT_ALLOWED_ORIGINS` in `.env`.

## Checks

```sh
php -l C:/xampp/htdocs/gr8/api/project-visitors/config.php
php -l C:/xampp/htdocs/gr8/api/project-visitors/_env.php
```

For a live delivery check, configure your email provider, select a card at
`/projects/`, verify the code from a real mailbox, and view the visitor in admin.
