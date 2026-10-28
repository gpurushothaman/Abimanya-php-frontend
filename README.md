# PHP Frontend — Axios Login + Protected Routes

This example keeps the UI in PHP/HTML and uses Axios in the browser to call an existing Node.js login API. A small PHP session bridge validates the returned token against a Node.js verification endpoint, then stores trusted user details in the PHP session. Protected pages are routed through `public/index.php`.

## Requirements

- PHP 8.0+ (uses `str_starts_with`)
- Apache with `mod_rewrite` enabled, or equivalent web-server routing
- Existing Node.js API with:
  - `POST http://localhost:5000/api/auth/login` returning `{ "success": true, "token": "..." }`
  - `GET http://localhost:5000/api/auth/me` accepting `Authorization: Bearer <token>` and returning a trusted user profile, such as `{ "id": "...", "name": "...", "email": "...", "role": "user" }`

## Setup

1. Copy the project to your PHP web root.
2. Configure Apache's document root to the project's `public/` directory.
3. Ensure Apache `mod_rewrite` and `.htaccess` overrides are enabled.
4. Update `API_LOGIN_URL` in `public/assets/js/login.js` to your Node API URL.
5. Set `NODE_API_ME_URL` in your PHP server environment to the Node API's token verification/profile endpoint.
6. Run PHP and your Node API. Open `/login`.

## Routes

- `/login` — guest-only login page
- `/dashboard` — protected
- `/users` — protected
- `/products` — protected
- `/orders` — protected

Add routes in `app/routes/web.php`. Set `middleware` to `['auth']` or `['guest']`.

## Security notes

- Never trust user details submitted by browser JavaScript. The PHP session bridge validates the token with the Node API before establishing a session.
- Use HTTPS in production. Configure secure cookies appropriately.
- Add CSRF protection to state-changing requests (including logout/session establishment) and rate-limit login attempts.
- Use the API's actual token verification endpoint/response shape. Do not disable token validation.
- PHP sessions protect PHP pages only. Node API endpoints must enforce their own authentication and authorization.
- The default local development URLs assume the PHP frontend and Node API are reachable from the browser at their configured addresses. Configure CORS on the Node API if the origins differ.
