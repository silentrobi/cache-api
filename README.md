# Cache API

## Project Commands:

- Run in development mode: `npm run start:dev`
- Run in production mode: `npm run start`
- Test : `npm run test`

## Endpoints

- Returns value of a key: `GET /cache/:key`
- Returns all keys: `GET /cache`
- Creates/ updates cache data: `/POST /cache`

```json
{
  "key": "test1",
  "value": "test value1"
}
```
- Deletes a key: `/DELETE /cache/:key`
- Deletes all key: `/DELETE /cache`