# Pet Shop API

REST API for the [Pet Shop](../README.md) frontend: categories, products, orders.
Built with **Node.js, Express 4, Sequelize 6 and SQLite**.

> The starter version of this API came with the [ITCareerHub.de](https://itcareerhub.de)
> course. I added the protected create/update/delete endpoints, shared validation,
> the API key middleware, CORS allow-list and environment configuration.

Deployed on Render: https://pet-shop-api-3od3.onrender.com
(free plan: the first request after 15 minutes of inactivity takes about 20–60 s).

## Run locally

```bash
cd server
npm install
cp .env.example .env    # set your own ADMIN_API_KEY
npm run dev             # nodemon, http://localhost:3333
# or
npm start               # plain node, as on Render
```

Start the server **from the `server/` folder**: the SQLite file path
(`./database.sqlite`) and the `public/` folder are relative to it.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `3333` | Server port (Render sets it automatically) |
| `ADMIN_API_KEY` | – | Secret for POST / PUT / DELETE product endpoints. Without it these endpoints reject every request. |
| `CORS_ORIGINS` | `https://pet-shop-roan-five.vercel.app,http://localhost:5173` | Allowed frontend URLs, comma-separated |

## Endpoints

### Categories

| Method | Endpoint | Response |
|---|---|---|
| GET | `/categories/all` | Array of categories `{ id, title, image }` |
| GET | `/categories/:id` | `{ category, data: [products] }` |

### Products

| Method | Endpoint | Auth | Response |
|---|---|---|---|
| GET | `/products/all` | – | Array of products |
| GET | `/products/:id` | – | Product, or `404` |
| POST | `/products/add` | `x-api-key` | `201 { success, itemId }` |
| PUT | `/products/:id` | `x-api-key` | `200 { success, product }` |
| DELETE | `/products/:id` | `x-api-key` | `200 { success }`, or `404` |

Product fields: `title`, `price`, `discont_price` (sale price or `null`),
`description`, `image` (path like `/product_img/1.jpeg`), `categoryId`.
The field name `discont_price` comes from the original course API.

**Validation** (shared by POST and PUT, `validation/productValidation.js`):

- POST requires `title`, `price` and `description`
- PUT changes only the fields you send (partial update)
- `title`, `description`, `image`: non-empty strings
- `price`: number greater than 0
- `discont_price`: number lower than the price, or `null` to remove the discount
- `categoryId`: id of an existing category (POST uses category `1` if not set)
- Unknown fields such as `id` are ignored

Errors return `400` with a list:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["price must be a number greater than 0"]
}
```

Example:

```bash
curl -X POST http://localhost:3333/products/add \
  -H "Content-Type: application/json" \
  -H "x-api-key: <your ADMIN_API_KEY>" \
  -d '{"title": "Cat toy", "price": 12, "description": "Soft toy", "categoryId": 4}'
```

### Orders and discount requests (demo)

| Method | Endpoint | Body |
|---|---|---|
| POST | `/order/send` | `{ customer: { name, phone, email }, products, totalCount, totalPrice }` |
| POST | `/sale/send` | `{ name, phone, email }` |

Both return `{ status: "OK", message: "request processed" }`. The data is **not
stored**.

### Static files

Images are served from `public/`: `/product_img/<id>.jpeg`, `/category_img/<id>.jpeg`.

## Auth

`middleware/auth.js` compares the `x-api-key` header with `ADMIN_API_KEY`:
missing header → `401`, wrong key → `403`. The key lives only in `server/.env`
locally and in Render's environment settings; it is never sent to the frontend.

## Known limitations

- SQLite runs on Render's temporary disk, so changes made through the API are lost
  when the server restarts or is redeployed (the committed `database.sqlite` is used again).
- Orders and discount requests are not saved.
- `npm audit` still reports advisories in `sqlite3`'s install-time build tools
  (`node-gyp`, `tar`). They are not used while the server runs; the fix requires
  `sqlite3` v6 (Node.js 20.17+), which is not tested with Sequelize 6 yet.
